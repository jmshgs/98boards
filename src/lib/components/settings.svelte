<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let timeFirst;
    export let messagesTop;

    export let oldUI;

    $: newModalClass = oldUI ? "" : "rounded-3xl bg-white border-gray-400 border-2 shadow-md";

</script>

<div class="w-[50rem] p-4 sm:p-6 md:p-8 text-left {newModalClass}">
    <form class="space-y-6 mb-4"> 
        <h5 class="text-3xl font-bold text-black dark:text-white">settings</h5>
    </form>
    <div class="flex flex-row justify-start space-x-20">
        <div class="flex flex-col">
            <label for="messageDirection" class="text-lg font-bold text-black dark:text-white">message direction</label>
            <select id="messageDirection" name="messageDirection" class="w-64 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md" bind:value={messagesTop}>
                <option value={true}>top to bottom</option>
                <option value={false}>bottom to top</option>
            </select>
        </div>

        <div class="flex flex-col">
            <label for="messageFormat" class="text-lg font-bold text-black dark:text-white">message format</label>
            <select id="messageFormat" name="messageFormat" class="w-64 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md" bind:value={timeFirst}>
                <option value={true}>time - user: message</option>
                <option value={false}>user: message @ time</option>
            </select>
        </div>
    </div>
</div>

