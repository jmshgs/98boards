<script>
    import { supabase, insertBoard } from '$lib/supabaseClient.js';

    export let themesCSS;
    export let oldUI = false;

    let iPtoBan = "";
    let UsertoBan = "";
    let ReasonForBan = "";

    $: newModalClass = `${oldUI ? "" : "rounded-3xl border-gray-300 shadow-lg"} ${themesCSS}`;

    async function addIPToBanList() {
        const { error } = await supabase
            .from('banned_users')
            .insert([{ user_id: UsertoBan, ip_address: iPtoBan, reason: ReasonForBan }]);
        
        if (error) {
            console.error('Error banning IP:', error.message);
        } else {
            console.log('IP banned successfully');
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        addIPToBanList();
    }
</script>

<div class={`max-w-4xl mx-auto p-8 text-left bg-white shadow-md ${newModalClass}`}>
    <h5 class="text-2xl font-semibold mb-6 text-gray-800">Ban IP</h5>
    <form class="space-y-4" on:submit={handleSubmit}>
        <div class="flex flex-col space-y-4">
            <input 
                type="text" 
                class="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                placeholder="Enter IP address" 
                bind:value={iPtoBan} 
            />
            <input 
                type="text" 
                class="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                placeholder="Enter username" 
                bind:value={UsertoBan} 
            />
            <input 
                type="text" 
                class="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                placeholder="Enter reason" 
                bind:value={ReasonForBan} 
            />
            <button 
                type="submit" 
                class="bg-blue-500 text-white rounded-lg px-5 py-3 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
                Ban IP
            </button>
        </div>
    </form>
</div>
