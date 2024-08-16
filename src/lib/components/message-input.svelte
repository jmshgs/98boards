<script>
    import Emojipicker from "$lib/components/emojipicker.svelte";

    export let message = "";
    export let username;
    export let themesCSS;
    export let sendMessage;
    export let emojiPickerOpen;

    let isActive = false;
    let file = null;

    function toggleActive() {
        isActive = !isActive;
        emojiPickerOpen = !emojiPickerOpen;
    }

    function handleEmojiSelected(event) {
        message += event.detail;
    }

    async function handleSendMessage() {
        await sendMessage(message, file);
        message = "";
        file = null;
        document.getElementById("file-upload").value = null; 
    }

    function handleFileChange(event) {
        file = event.target.files[0]; 
    }
</script>

<style>
    .active-border {
        border-color: blue;
    }
</style>

{#if !emojiPickerOpen}
    <Emojipicker on:emojiSelected={handleEmojiSelected} />
{/if}
<div class="overflow-y-auto py-4 space-x-4 flex items-center justify-center {themesCSS}">
    <div class="border border-gray-300 {themesCSS} rounded-xl w-[5.5vw] p-2.5 m-1 focus:outline-none flex items-center justify-center {isActive ? 'active-border' : ''}" on:click={toggleActive}>
        <span class="h-6" role="img" aria-label="smile">😊</span>
    </div>
    <input on:keypress={(e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    }} type="text" name="message" id="message" class="border-gray-300 {themesCSS} rounded-xl w-[59vw] p-2.5 m-1 focus:outline-none" placeholder="say hello, {username}" bind:value={message}>
    <input id="file-upload" type="file" class="hidden" on:change={handleFileChange} />
    <label for="file-upload" class="cursor-pointer border border-gray-300 {themesCSS} rounded-xl w-[5vw] p-2.5 m-1 flex items-center justify-center">
        <span class="h-6 {file ? 'icon-checkmark' : 'icon-paperclip'}" role="img" aria-label={file ? 'checkmark' : 'paperclip'}>
            {#if file}
                ✔️ 
            {:else}
                📁
            {/if}
        </span>
    </label>
</div>
