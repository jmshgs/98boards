<script>
    export let themesCSS;
    export let oldUI = false;
    export let boards;

    let inputBoardName = "";
    let inputBoardPassword = "";

    let isPrivate = false;

    $: checkboxLabel = isPrivate ? "private" : "public";
    $: newModalClass = `${oldUI ? "" : "rounded-3xl border-gray-400 border-2 shadow-md"} ${themesCSS}`;

    function changePrivate() {
        isPrivate = !isPrivate;
        console.log(isPrivate)
    }

    function createNewBoard() {
        boards.push(inputBoardName);
        inputBoardName = "";
    
    }
</script>

<div class="w-[30rem] p-4 sm:p-6 md:p-8 text-left {newModalClass}">
    <h5 class="text-3xl font-bold {themesCSS}">create board</h5>
    <form class="space-y-2 w-[25rem]">
        <div class="overflow-y-auto overflow-x-scroll py-4 space-x-4 flex items-center justify-between {themesCSS}">
            <input type="text" class="border-gray-300 {themesCSS} rounded-xl w-[60vw] p-2.5 m-1 focus:outline-none" placeholder="enter board name" bind:value={inputBoardName}>            
            <input type="checkbox" bind:checked={isPrivate} on:click={() => {
                changePrivate();
            }}>            
            <h7>{checkboxLabel}</h7>
        </div>				
        {#if isPrivate}
        <input type="text" class="border-gray-300 {themesCSS} rounded-xl w-full p-2.5 m-1 focus:outline-none" placeholder="enter password" bind:value={inputBoardPassword}>            
        {/if}
        <button class={isPrivate ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} on:click={() => {
            createNewBoard();
        }}>
            Create
        </button>
    </form>
</div>