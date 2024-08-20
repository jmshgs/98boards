<script>
    import { supabase, fetchBoards} from '$lib/supabaseClient.js'
    import { onMount } from 'svelte';

    let boards;
    export let currentBoard;
    export let showSettings;
    export let themeColor;
    export let newButtonClass;
    export let createBoard;
    export let joinBoard;
    export let isDeleting;
    export let isPrivate;

    export let username;
    export let isCreator;


</script>

<aside class="lg:w-64 w-96 h-screen transition-transform bg-gray-100" aria-label="Sidebar">
    <div class="h-full px-3 overflow-y-auto flex-col">
        <div class="justify-start items-start">
            <h1 class="w-full pt-4 text-xl font-semibold">
                boards:
            </h1>
            <ul class="list-none px-4 py-2 space-y-1.5">
                {#each boards as board}
                    <li>
                        <button class="decoration-none transition-all hover:scale-[105%] hover:pl-2" class:scale-[102%]={currentBoard == board && !isPrivate} class:font-bold={currentBoard == board && !isPrivate} class:pl-0.5={currentBoard == board && !isPrivate} on:click={() => {
                            currentBoard = board;
                        }}>{board}</button>
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
        {#if isCreator}
        <div class="flex items-end">
            <button class="justify-center flex w-full p-2 m-2 {themeColor=='light' ? "bg-slate-200": ""} {newButtonClass}" on:click={() => {
                isDeleting = true;
            }}>
                manage board
            </button>
        </div>
        {/if}
        <div class="flex items-end">
            <button class="justify-center flex w-full p-2 m-2 {themeColor=='light' ? "bg-slate-200": ""} {newButtonClass}" on:click={() => {
                goAbout = true;
            }}>
                about
            </button>
        </div>

    </div>
</aside>