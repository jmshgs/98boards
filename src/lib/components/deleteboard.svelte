<script>
	import { supabase, deleteBoard} from '$lib/supabaseClient.js'
    import { persisted } from 'svelte-persisted-store';

    export let themesCSS;
    export let oldUI = false;
    export let board;
    export let boards;

    export let persistedBoardsStore  = persisted('boards', {key: 'boards' });

    export let isDeleting;
    export let isCreator;

    let boardmode = true; ///true means delete board, false means clear message

    let inputBoardPassword = "";

    let deleted = false;
    let invalid = false;

    $: checkmode = boardmode ? "Delete board" : "Clear messages";
    $: checkmode2 = boardmode ? "confirm deletion" : "confirm clearing";

    $: newModalClass = `${oldUI ? "" : "rounded-3xl border-gray-400 border-2 shadow-md"} ${themesCSS}`;

    function Deleteboard() {
        if (inputBoardPassword != "confirm deletion"){
            invalid = true;
            return;
        }
        else{
            console.log('deleting board')
            deleteBoard(board).then(() => {
                console.log(`board ${board} deleted`)
            })
            boards = boards.filter(item => item !== board);
            persistedBoardsStore.set(boards)
            isDeleting = false;
            console.log(isDeleting)
            isCreator = false;
            console.log(isCreator)
            deleted = true;

        }
    }

    function SwapMode(){
        boardmode = !boardmode;
        inputBoardPassword = "";
        invalid = false;
        deleted = false;
    }

</script>

<div class="w-[30rem] p-4 sm:p-6 md:p-8 text-left {newModalClass}">
    <h5 class="text-3xl font-bold {themesCSS}">{checkmode}</h5>
    <form class="space-y-2 w-[25rem]">
        <div class="overflow-y-auto py-4 space-x-4 flex items-center justify-between {themesCSS}">
            <input type="text" class="border-gray-300 {themesCSS} rounded-xl w-[60vw] p-2.5 m-1 focus:outline-none" placeholder="enter '{checkmode2}'" bind:value={inputBoardPassword}>  
        </div>				
    </form>
    {#if boardmode}
        <button class= "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" on:click={() => {
        Deleteboard()
    }}>Delete ...</button>
        <button class= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => {
        SwapMode()
        }}>Clear ...</button>
    
    {/if}
    {#if !boardmode}
        <button class= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => {
        //Clearboard()
    }}>Clear ...</button>
        <button class= "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" on:click={() => {
        SwapMode()
        }}>Delete ...</button>    
    {/if}
    {#if deleted}
        <p class="text-green-500">Board deleted</p>
    {/if}
    {#if invalid}
        <p class="text-red-500">Invalid confirmation</p>
    {/if}
</div>