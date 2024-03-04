<script>
    export let themesCSS;
    export let oldUI = false;
    export let boards;
    export let messages;

    let inputBoardName = "";
    let inputBoardPassword = "";
    let foundBoard = false;

    function searchBoard(){
        console.log(messages)
        for (let message of messages){
            if (message.board == inputBoardName){
                foundBoard = true;
                console.log('found')
                boards.push(inputBoardName);
                break;
            }
    }
}
    $: newModalClass = `${oldUI ? "" : "rounded-3xl border-gray-400 border-2 shadow-md"} ${themesCSS}`;

</script>

<div class="w-[30rem] p-4 sm:p-6 md:p-8 text-left {newModalClass}">
    <h5 class="text-3xl font-bold {themesCSS}">join board</h5>
    <form class="space-y-2 w-[25rem]">
        <div class="overflow-y-auto overflow-x-scroll py-4 space-x-4 flex items-center justify-between {themesCSS}">
            <input type="text" class="border-gray-300 {themesCSS} rounded-xl w-[60vw] p-2.5 m-1 focus:outline-none" placeholder="enter board name" bind:value={inputBoardName}>            
        </div>				
        <input type="text" class="border-gray-300 {themesCSS} rounded-xl w-full p-2.5 m-1 focus:outline-none" placeholder="enter password, if none leave blank" bind:value={inputBoardPassword}>            
        <br>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" on:click={() => {
            searchBoard();
        }}>
            Search!
        </button>
        {#if foundBoard && inputBoardName != ""}
        <div class="mt-4 text-green-500">Board found! Joined Board!</div>
        {/if}

    </form>
</div>