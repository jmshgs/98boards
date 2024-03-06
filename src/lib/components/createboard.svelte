<script>
	import { supabase, insertBoard} from '$lib/supabaseClient.js'

    export let themesCSS;
    export let oldUI = false;
    export let boards;
    export let username

    let inputBoardName = "";
    let inputBoardPassword = "";

    let isPrivate = false;
    let isEmpty = false;
    let isCreated = false;
    let isExist = false;

    $: checkboxLabel = isPrivate ? "private" : "public";
    $: newModalClass = `${oldUI ? "" : "rounded-3xl border-gray-400 border-2 shadow-md"} ${themesCSS}`;

    function changePrivate() {
        isPrivate = !isPrivate;
        console.log(isPrivate)
    }

    async function createNewBoard() {
    if (inputBoardName == "") {
        isEmpty = true;
        isCreated = false;
        isExist = false;
        return;
    }
    else{
        let newBoard = {
            name: inputBoardName, 
            isPrivate: isPrivate, 
            password: inputBoardPassword,
            creator: username
        }
        try {
            await insertBoard(newBoard);
            boards.push(inputBoardName);
            inputBoardName = "";
            inputBoardPassword = "";
            isEmpty = false;
            isCreated = true;
            isExist = false;
        } catch (error) {
            console.log(error);
            isExist = true;
            isCreated = false;
            isEmpty = false;
        }
    }
}</script>

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
        {#if isEmpty}
        <div class="mt-4 text-red-500">Board name cannot be empty!</div>
        {/if}
        {#if isExist}
        <div class="mt-4 text-red-500">Board already exists!</div>
        {/if}
        {#if isCreated}
        <div class="mt-4 text-green-500">Board created!</div>
        {/if}
    </form>
</div>