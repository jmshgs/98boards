<script>
    export let themesCSS;
    export let oldUI = false;
    let inputBoardName = "";
    let isPrivate = false;

    $: checkboxLabel = isPrivate ? "private" : "public";
    $: newModalClass = `${oldUI ? "" : "rounded-3xl border-gray-400 border-2 shadow-md"} ${themesCSS}`;

    function changePrivate() {
        isPrivate = !isPrivate;
        console.log(isPrivate)
    }
</script>

<div class="w-[30rem] p-4 sm:p-6 md:p-8 text-left {newModalClass}">
    <h5 class="text-3xl font-bold {themesCSS}">create board</h5>
    <form class="space-y-6 w-[25rem]">
        <div class="overflow-y-auto overflow-x-scroll py-4 space-x-4 flex items-center justify-between {themesCSS}">
            <input type="text" class="border-gray-300 {themesCSS} rounded-xl w-[60vw] p-2.5 m-1 focus:outline-none" placeholder="enter board name" bind:value={inputBoardName}>            
            <input type="checkbox" bind:checked={isPrivate} on:click={() => {
                changePrivate();
            }}>            
            <h7>{checkboxLabel}</h7>
        </div>				
    </form>
    <form class="space-y-6 w-[10rem]">
        {#if isPrivate}
        <input type="text" class="border-gray-300 {themesCSS} rounded-xl w-full p-2.5 m-1 focus:outline-none" placeholder="enter password" bind:value={inputBoardName}>            
        {/if}
    </form> 
    <form></form>
</div>