<script>
    import { changeTheme } from '$lib/main.js';

    export let themesCSS;
    export let fontCSS;
    export let showDate;
    export let showHighlight;

    $: newModalClass = `rounded-3xl border-gray-400 border-2 shadow-md ${themesCSS}`;
</script>

<div class="flex justify-center items-center {newModalClass} bg-white p-4 sm:p-6 md:p-8">
    <div class="w-[43rem] text-left">
        <form class="space-y-6 mb-4"> 
            <h5 class="text-3xl font-bold {themesCSS} {fontCSS}">Additional Settings</h5>
        </form>
        <div class="flex flex-col justify-start space-y-3 {fontCSS}">
            <div class="flex flex-row justify-start space-x-10">
                <div class="flex flex-col">
                    <label for="someSetting" class="text-lg font-bold {themesCSS}">Show Date</label>
                    <select id="someSetting" name="someSetting" class="w-32 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themesCSS}"bind:value={showDate}>
                        <option value={true}>Show</option>
                        <option value={false}>Hide</option>
                    </select>
                </div>
                <div class="flex flex-col">
                    <label for="anotherSetting" class="text-lg font-bold {themesCSS}">Highlight Newest Message</label>
                    <select id="anotherSetting" name="anotherSetting" class="w-64 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themesCSS}"bind:value={showHighlight}>
                        <option value={true}>Show Highlight</option>
                        <option value={false}>Hide Highlight</option>
                    </select>
                </div>
            </div>
            <!-- Add more settings as needed -->
        </div>
    </div>
</div>
