<script>
    import { changeTheme } from '$lib/main.js';
    import SettingsPage2 from '$lib/components/settings2.svelte';

    export let dashMessage;
    export let messagesTop;
    export let themeColor;
    export let themesCSS;
    export let fontCSS;
    export let isPrivate;
    export let showDate;
    export let showHighlight;

    export let oldUI;

    let showPage2 = false;

    $: newModalClass = `${oldUI ? "" : "rounded-3xl border-gray-400 border-2 shadow-md"} ${themesCSS}`;

    function togglePage() {
        showPage2 = !showPage2;
    }
</script>

<div class="w-[43rem] p-4 sm:p-6 md:p-8 text-left {newModalClass}">
    {#if showPage2}
        <SettingsPage2 
            bind:themesCSS={themesCSS} 
            bind:fontCSS={fontCSS} 
            bind:showDate={showDate}
            bind:showHighlight={showHighlight}
        />
    {:else}
        <form class="space-y-6 mb-4"> 
            <h5 class="text-3xl font-bold {themesCSS} {fontCSS}">settings</h5>
        </form>
        <div class="flex flex-col justify-start space-y-10 {fontCSS}">
            <div class="flex flex-row justify-start space-x-10">
                <div class="flex flex-col">
                    <label for="messageDirection" class="text-lg font-bold {themesCSS}">message direction</label>
                    <select id="messageDirection" name="messageDirection" class="w-64 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themesCSS}" bind:value={messagesTop}>
                        <option value={true}>new message at top</option>
                        <option value={false}>new message on bottom</option>
                    </select>
                </div>
                <div class="flex flex-col">
                    <label for="theme" class="text-lg font-bold {themesCSS}">theme</label>
                    <select id="theme" name="theme" class='w-32 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themesCSS}' bind:value={themeColor} on:input={() => {
                        setTimeout(() => {
                            themesCSS = changeTheme(themeColor);
                        }, 25);
                    }}>
                        <option value={"auto"}>auto</option>
                        <option value={"light"}>light</option> 
                        <option value={"dark"}>dark</option>
                    </select>
                </div>
                <div class="flex flex-col">
                    <label for="private" class="text-lg font-bold {isPrivate}">privacy</label>
                    <select id="private" name="private" class='w-32 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themesCSS}' bind:value={isPrivate} on:input={() => {
                        setTimeout(() => {
                            themesCSS = changeTheme(themeColor);
                        }, 25);
                    }}>
                        <option value={true}>private</option>
                        <option value={false}>public</option> 
                    </select>
                </div>
            </div>
            <div class="flex flex-row justify-start space-x-10">
                <div class="flex flex-col">
                    <label for="messageFormat" class="text-lg font-bold {themesCSS}">message format</label>
                    <select id="messageFormat" name="messageFormat" class="w-64 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themesCSS}" bind:value={dashMessage}>
                        <option value={true}>user: message - time</option>
                        <option value={false}>user: message @ time</option>
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
        </div>
    {/if}

    <div class="mt-6">
        <button 
            on:click={togglePage} 
            class={`w-full h-10 rounded-xl border-2 shadow-md bg-gray-200 text-gray-800 hover:bg-gray-300 {themesCSS}`}
        >
            {showPage2 ? 'Back to Main Settings' : 'Go to Additional Settings'}
        </button>
    </div>
</div>
