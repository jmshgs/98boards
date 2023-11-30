<script>
    export let timeFirst;
    export let messagesTop;
    export let themeColor;
    export let themesCSS;

    export let oldUI;

    const changeTheme = () => {
        console.log(themeColor)
        switch (themeColor) {
            case "auto":
                themesCSS = "bg-gray-50 text-black dark:bg-gray-950 dark:text-gray-50"
                break
            case "light":
                themesCSS = "bg-gray-50 text-black"
                break
            case "dark":
                themesCSS = "bg-gray-950 text-gray-50"
                break
        }
        console.log(themesCSS)
    }

    $: newModalClass = `${oldUI ? "" : "rounded-3xl border-gray-400 border-2 shadow-md"} ${themesCSS}`
</script>

<div class="w-[20rem] p-4 sm:p-6 md:p-8 text-left {newModalClass}">
    <form class="space-y-6 mb-4"> 
        <h5 class="text-3xl font-bold {themesCSS}">settings</h5>
    </form>
    <div class="flex flex-col justify-start space-y-10">
        <div class="flex flex-col">
            <label for="messageDirection" class="text-lg font-bold {themesCSS}">message direction</label>
            <select id="messageDirection" name="messageDirection" class="w-64 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themesCSS}" bind:value={messagesTop}>
                <option value={true}>new message at top</option>
                <option value={false}>new message on bottom</option>
            </select>
        </div>

        <div class="flex flex-col">
            <label for="messageFormat" class="text-lg font-bold {themesCSS}">message format</label>
            <select id="messageFormat" name="messageFormat" class="w-64 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themesCSS}" bind:value={timeFirst}>
                <option value={true}>time - user: message</option>
                <option value={false}>user: message @ time</option>
            </select>
        </div>

        <div class="flex flex-col">
            <label for="theme" class="text-lg font-bold {themesCSS}">theme</label>
            <select id="theme" name="theme" class='w-64 h-10 mt-2 rounded-xl border-gray-400 border-2 shadow-md {themesCSS}' bind:value={themeColor} on:input={() => {
                setTimeout((changeTheme), 25)
            }}>
                <option value={"auto"}>automatic</option>
                <option value={"light"}>light</option> 
                <option value={"dark"}>dark</option>
            </select>
        </div>
    </div>
</div>

