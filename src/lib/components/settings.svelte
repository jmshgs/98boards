<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let timeFirst;
    export let messagesTop;
    export let themeColor;

    export let oldUI;
    $: themes = themeColor ? "bg-white text-black" : "bg-black text-white";
    $: newModalClass = `${oldUI ? "" : "rounded-3xl border-gray-400 border-2 shadow-md"} ${themes}`
</script>

<div class="w-[20rem] p-4 sm:p-6 md:p-8 text-left {newModalClass}">
    <form class="space-y-6 mb-4"> 
        <h5 class="text-3xl font-bold {themes}">settings</h5>
    </form>
    <div class="flex flex-col flex-row justify-start space-y-20">
        <div class="flex flex-col">
            <label for="messageDirection" class="text-lg font-bold {themes}">message direction</label>
            <select id="messageDirection" name="messageDirection" class="w-64 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themes}" bind:value={messagesTop}>
                <option value={true}>new message at top</option>
                <option value={false}>new message on bottom</option>
            </select>
        </div>

        <div class="flex flex-col">
            <label for="messageFormat" class="text-lg font-bold {themes}">message format</label>
            <select id="messageFormat" name="messageFormat" class="w-64 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themes}" bind:value={timeFirst}>
                <option value={true}>time - user: message</option>
                <option value={false}>user: message @ time</option>
            </select>
        </div>

        <div class="flex flex-col">
            <label for="theme" class="text-lg font-bold {themes}">theme</label>
            <select id="theme" name="theme" class='w-64 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themes}' bind:value={themeColor}>
                <option value={true}>light</option>
                <option value={false}>dark</option>
            </select>
        </div>
    </div>
</div>

