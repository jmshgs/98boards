<script>
    import Emojipicker from "$lib/components/emojipicker.svelte";

    export let message = "";
    export let messages;
    export let username;
    export let themesCSS;
    export let sendMessage;
    export let emojiPickerOpen;
    export let isReplying;
    export let replyTo;

    let isActive = false;
    let file = null;
    let fileName = "";
    let imageUrl = "";

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
        fileName = "";
        imageUrl = "";
        document.getElementById("file-upload").value = null;
    }

    function handleFileChange(event) {
        file = event.target.files[0]; 
        if (file) {
            if (file.type.startsWith('image/')) {
                imageUrl = URL.createObjectURL(file);
            } else {
                fileName = file.name;
                imageUrl = "";
            }
        } else {
            imageUrl = "";
            fileName = "";
        }
    }
    function getMessageById(id) {
        return messages.find(msg => msg.id === id);
    }

</script>

{#if !emojiPickerOpen}
    <Emojipicker on:emojiSelected={handleEmojiSelected} />
{/if}

<div class="relative flex items-center space-x-4 py-4 overflow-y-auto {themesCSS}">
    {#if imageUrl}
        <!-- Image preview section -->
        <img src={imageUrl} alt="Image preview" class="w-12 h-12 object-cover rounded-md mr-4" />
    {:else if fileName}
        <!-- File name preview section -->
        <span class="text-gray-700">{fileName}</span>
    {/if}
    <div class="relative {isReplying ? 'w-[80vw]' : 'w-full'}">
        <input
            on:keypress={(e) => {
                if (e.key === "Enter") {
                    handleSendMessage();
                }
            }}
            type="text"
            name="message"
            id="message"
            class={`w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none ${themesCSS}`}
            placeholder="say hello, {username}"
            bind:value={message}
        />
    </div>
    
    {#if isReplying}
        <div class="relative w-[20vw]"> <!-- Adjust width as needed -->
            <div class="flex items-center justify-between border border-gray-300 rounded-xl p-2.5">
                <span class="text-gray-500">Replying to {getMessageById(replyTo).sender} </span>
                </div>
        </div>
    {/if}
    
    <div class={`flex items-center justify-center border border-gray-300 rounded-xl w-[5vw] h-12 cursor-pointer ${themesCSS} ${isActive ? 'border-blue-500' : ''}`} role="region" on:click={toggleActive}>
        <span class="h-6" role="img" aria-label="smile">😊</span>
    </div>
    <input id="file-upload" type="file" class="hidden" on:change={handleFileChange} />
    <label for="file-upload" class="flex items-center justify-center border border-gray-300 rounded-xl w-[5vw] h-12 cursor-pointer ${themesCSS}">
        <span class="h-6" role="img" aria-label={file ? 'checkmark' : 'paperclip'}>
            {#if file}
                ✔️ 
            {:else}
                📁
            {/if}
        </span>
    </label>
</div>
