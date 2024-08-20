<script>
    import { changeTheme } from '$lib/main.js';

    export let themeColor;
    export let themesCSS;
    export let fontCSS;
    export let isPrivate;
    export let showDate;
    export let showHighlight;
    export let showImages;

    export let oldUI;


    $: newModalClass = `${oldUI ? "" : "rounded-3xl border-gray-400 border-2 shadow-md"} ${themesCSS}`;

</script>

<div class="w-[43rem] p-4 sm:p-6 md:p-8 text-left {newModalClass}">
    <form class="space-y-6 mb-4"> 
        <h5 class="text-3xl font-bold {themesCSS} {fontCSS}">settings</h5>
    </form>
    <div class="flex flex-col justify-start space-y-10 {fontCSS}">
        <div class="flex flex-row justify-start space-x-10">
            <div class="flex flex-col">
                <label for="private" class="text-lg font-bold {isPrivate}">privacy</label>
                <select id="private" name="private" class='w-64 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themesCSS}' bind:value={isPrivate} on:input={() => {
                    setTimeout(() => {
                        themesCSS = changeTheme(themeColor);
                    }, 25);
                }}>
                    <option value={true}>private</option>
                    <option value={false}>public</option> 
                </select>
            </div>
            <div class="flex flex-col">
                <label for="font" class="text-lg font-bold {fontCSS}">font</label>
                <select id="font" name="font" class="w-32 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themesCSS}" bind:value={fontCSS}>
                    <option value={'font-apple'}>apple</option>
                    <option value={"font-sans"}>sans-serif</option>
                    <option value={"font-serif"}>serif</option>
                    <option value={"font-mono"}>monospace</option>
                </select>
            </div>
            <div class="flex flex-col">
                <label for="ui" class="text-lg font-bold {fontCSS}">ui</label>
                <select id="ui" name="ui" class="w-32 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themesCSS}" bind:value={oldUI}>
                    <option value={true}>old ui</option>
                    <option value={false}>new ui</option>
                </select>
            </div>
        </div>
        <div class="flex flex-row justify-start space-x-10">
            <div class="flex flex-col">
                <label for="anotherSetting" class="text-lg font-bold {themesCSS}">highlight new msg</label>
                <select id="anotherSetting" name="anotherSetting" class="w-64 h-10 mt-2 rounded-xl border-gray-400 border-2 {themesCSS}" bind:value={showHighlight}>
                    <option value={true}>Show Highlight</option>
                    <option value={false}>Hide Highlight</option>
                </select>
            </div>
            <div class="flex flex-col">
                <label for="someSetting" class="text-lg font-bold {themesCSS}">show date</label>
                <select id="someSetting" name="someSetting" class="w-32 h-10 mt-2 rounded-xl border-gray-400 border-2 {themesCSS}" bind:value={showDate}>
                    <option value={true}>Show</option>
                    <option value={false}>Hide</option>
                </select>
            </div>
            <div class="flex flex-col">
                <label for="anotherSetting" class="text-lg font-bold {themesCSS}">show images</label>
                <select id="anotherSetting" name="anotherSetting" class="w-32 h-10 mt-2 rounded-xl border-gray-400 border-2 {themesCSS}" bind:value={showImages}>
                    <option value={true}>Show</option>
                    <option value={false}>Hide</option>
                </select>
            </div>
        </div>
    </div>
</div>
