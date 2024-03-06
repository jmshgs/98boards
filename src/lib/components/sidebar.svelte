<script>

    import { supabase, fetchBoards} from '$lib/supabaseClient.js'

    export let boards;
    export let currentBoard;
    export let oldUI;
    export let showLogin;
    export let showSettings;
    export let fontCSS;
    export let themeColor;
    export let themesCSS;
    export let newButtonClass;
    export let createBoard;
    export let joinBoard;
    export let isDeleting;

    export let username;
    export let isCreator;

    console.log(createBoard)

    function isOwner(){
        let bars = []
        fetchBoards().then(data => {
            bars = data
            for (let board of bars){
                if (board.boardname == currentBoard){
                    if (board.creator == username && username != "anon" ){
                        isCreator = true;
                    }
                    else{
                        isCreator = false;
                    }
                }
                else{
                    isCreator = false;
                }
            }
        })
    }

</script>

<aside class="{fontCSS} lg:w-64 w-96 h-screen transition-transform bg-gray-100" class:window={oldUI} aria-label="Sidebar">
    <div class="h-full px-3 overflow-y-auto flex-col {themesCSS}">
        <div class="justify-start items-start">
            <h1 class="w-full pt-4 text-xl font-semibold" class:px-4={!oldUI}>
                boards:
            </h1>
            <ul class="list-none px-4 py-2 space-y-1.5" class:tree-view={oldUI}>
                {#each boards as board}
                <li>
                    {#if !oldUI}
                    <button class="decoration-none transition-all hover:scale-[105%]" class:scale-[105%]={currentBoard == board} class:text-blue-800={currentBoard == board} on:click={() => {
                        currentBoard = board;
                        isOwner();
                    }}>{board}</button>
                    {:else}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <p class="decoration-none transition-all hover:scale-[105%] hover:pl-2" class:scale-[102%]={currentBoard == board} class:font-bold={currentBoard == board} class:pl-0.5={currentBoard == board} on:click={() => {
                        currentBoard = board;
                        isOwner();
                    }}>{board}</p>
                    {/if}
                </li>
                {/each}
            </ul>
        </div>
        <div class="flex items-end">
            <button class="justify-center flex w-full p-2 m-2 {themeColor=='light' ? "bg-slate-200": ""}  {newButtonClass}" on:click={() => {showSettings=true;}}>
                settings
            </button>
        </div>
        <div class="flex items-end">
            <button class="justify-center flex w-full p-2 m-2 {themeColor=='light' ? "bg-slate-200": ""} {newButtonClass}" on:click={() => {
                createBoard = true;
            }}>
                create board
            </button>
        </div>
        <div class="flex items-end">
            <button class="justify-center flex w-full p-2 m-2 {themeColor=='light' ? "bg-slate-200": ""} {newButtonClass}" on:click={() => {
                joinBoard = true;
            }}>
                join a board
            </button>

        </div>
        <div class="flex items-end">
            <button class="justify-center flex w-full p-2 m-2 {themeColor=='light' ? "bg-slate-200": ""} {newButtonClass}" on:click={() => {
                showLogin = true;
            }}>
                user
            </button>
        </div>
        {#if isCreator}
        <div class="flex items-end">
            <button class="justify-center flex w-full p-2 m-2 {themeColor=='light' ? "bg-slate-200": ""} {newButtonClass}" on:click={() => {
                isDeleting = true;
            }}>
                manage board
            </button>
        </div>
        {/if}

    </div>

</aside>