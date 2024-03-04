<script>
	export let themesCSS;
    export let oldUI = false;
	export let username = "";
	let inputUsername = "";

	function changeUsername(){ 
		username = inputUsername; 
	}

    $: newModalClass = `${oldUI ? "" : "rounded-3xl border-gray-400 border-2 shadow-md"} ${themesCSS}`;
</script>

<div class="w-[32rem] p-4 sm:p-6 md:p-8 text-left {newModalClass}">
	<h5 class="text-3xl font-bold {themesCSS}">user</h5>
    <form class="space-y-6 w-[25rem]">
        <div class="overflow-y-auto overflow-x-scroll py-4 space-x-4 flex items-center justify-between {themesCSS}">
            <input on:keypress={
                (e) => {
                    if (e.key === "Enter") {
                        changeUsername()
                    }
                } 
                } type="text" class="border-gray-300 {themesCSS} rounded-xl w-[60vw] p-2.5 m-1 focus:outline-none" placeholder="enter username" bind:value={inputUsername}>
            <input type="text" class="border-gray-300 bg-black text-green-400 w-20 rounded-xl p-2.5 m-1 focus:outline-none" value={username} readonly>
        </div>				
    </form>
</div>