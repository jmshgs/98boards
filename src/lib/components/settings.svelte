<script>
    export let displayOption;
    export let oldUI;

    $: newModalClass = oldUI ? "" : "rounded-3xl bg-white border-gray-400 border-2 shadow-md";

</script>

<div class="w-[50rem] p-4 sm:p-6 md:p-8  text-left {newModalClass}">

    <form class="space-y-6 mb-4"> 
        <h5 class="text-3xl font-bold text-black dark:text-white">Settings</h5>
    </form>
    <div>
        {#if displayOption == "time-message"}
            <div class="flex items-center space-x-4">
                <p class="text-sm font-medium text-black dark:text-white"> Show messages as: time - user: message </p>
                <input type="text" value="2:00 - ian: hello" readonly class="bg-gray-50 border-gray-300 text-black rounded-xl w-[30vw] p-2.5 m-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 border-2 dark:text-white focus:outline-none">
                <input type="checkbox" checked class="form-checkbox h-5 w-5" on:click={() => {displayOption = "message-time";}}>
            </div>
        {:else}
            <div class="flex items-center space-x-4">
                <p class="text-sm font-medium text-black dark:text-white"> Show messages as: user: message @ time </p>
                <input type="text" value="ian: hello @ 2:00" readonly class="bg-gray-50 border-gray-300 text-black rounded-xl w-[30vw] p-2.5 m-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 border-2 dark:text-white focus:outline-none">
                <input type="checkbox" checked class="form-checkbox h-5 w-5" on:click={() => {displayOption = "time-message";}}>
            </div>
        {/if}
    </div>
</div>

