<script>
    // Your existing imports
    export let message = "";
    export let username;
    export let themesCSS;
    export let sendMessage;
    export let emojiPickerOpen;

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
</script>

<div class={`flex items-center space-x-4 py-4 overflow-y-auto ${themesCSS}`}>
    {#if imageUrl}
        <!-- Image preview section -->
        <img src={imageUrl} alt="Image preview" class="w-12 h-12 object-cover rounded-md mr-4" />
    {:else if fileName}
        <!-- File name preview section -->
        <span class="text-gray-700">{fileName}</span>
    {/if}
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
    <div class={`flex items-center justify-center border border-gray-300 rounded-xl w-12 h-12 cursor-pointer ${themesCSS} ${isActive ? 'border-blue-500' : ''}`} on:click={toggleActive}>
        <span class="h-6" role="img" aria-label="smile">😊</span>
    </div>
    <input id="file-upload" type="file" class="hidden" on:change={handleFileChange} />
    <label for="file-upload" class="flex items-center justify-center border border-gray-300 rounded-xl w-12 h-12 cursor-pointer ${themesCSS}">
        <span class="h-6" role="img" aria-label={file ? 'checkmark' : 'paperclip'}>
            {#if file}
                ✔️ 
            {:else}
                📁
            {/if}
        </span>
    </label>
</div>
