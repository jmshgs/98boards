<script>
	import { supabase, fetchBoards} from '$lib/supabaseClient.js'

    export let themesCSS;
    export let oldUI = false;
    export let boards;

    let inputBoardName = "";
    let inputBoardPassword = "";
    let foundBoard = false;
    let notfound = false;

    let needPassword = false;
    let wrongPassword = false;

    function searchBoard(){
    let bars = []
    fetchBoards().then(data => {
        console.log(data) 
        bars = data  
        let found = false;
        for (let board of bars){
            if (board.boardname == inputBoardName){
                found = true;
                if (board.isPrivate == true){
                    if (board.password == inputBoardPassword){
                        foundBoard = true;
                        needPassword = false;
                        wrongPassword = false;
                        notfound = false;
                        console.log('found')
                        console.log(boards)
                        if (!boards.includes(inputBoardName)){
                            boards = [...boards, inputBoardName];
                        }                
                        break;
                    }
                    else if (inputBoardPassword == ""){
                        foundBoard = false;
                        needPassword = true;
                        wrongPassword = false;
                        notfound = false;
                        console.log('no password')
                        break;
                    }
                    else{
                        foundBoard = false;
                        wrongPassword = true;
                        needPassword = false;
                        notfound = false;
                        console.log('wrong password')
                        break;
                    }
                }
                else{
                    foundBoard = true;
                    needPassword = false;
                    wrongPassword = false;
                    notfound = false;
                    console.log('found')
                    if (!boards.includes(inputBoardName)){
                        boards = [...boards, inputBoardName];
                    }                
                    break;
                }
            }
        }
        if (!found) {
            notfound = true;
        }
    });
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
        <br><br>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" on:click={() => {
            searchBoard();
        }}>
            Search!
        </button>
        {#if foundBoard && inputBoardName != ""}
        <div class="mt-4 text-green-500">Board found! Joined Board!</div>
        {/if}
        {#if needPassword}
        <div class="mt-4 text-yellow-500">This board needs a password</div>
        {/if}
        {#if wrongPassword}
        <div class="mt-4 text-red-500">Incorrect Password!</div>
        {/if}
        {#if notfound}
        <div class="mt-4 text-red-500">This board doesn't exist</div>
        {/if}

    </form>
</div>