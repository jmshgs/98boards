<script>
    import { Toaster, toast } from 'svelte-sonner';
    import { timeConverter } from '$lib/main.js';

    export let dashMessage;
    export let message;
    export let showHighlight;
    export let showDate;
    export let showImages;
    export let messageClass = ''; // Renamed to avoid conflict

    function renderMessageWithLink(content) {
        const parts = content.split(' ');
        return parts.map(part =>
            part.startsWith('https://')
                ? `<a href="${part}" target="_blank" class="text-blue-500 hover:text-blue-700 no-underline">${part}</a>`
                : part
        ).join(' ');
    }

    function copyToClipboard(content) {
        try {
            navigator.clipboard.writeText(content);
            toast.success("Copied To Clipboard!");
        } catch (err) {
            toast.error("Failed to copy: " + err);
        }
    }
</script>

<div class={`${showHighlight ? messageClass : ""} rounded-lg p-2 flex flex-col relative group`}>
    {#if message.image_url && showImages}
        <div class="message-content flex justify-between items-center">
            <div>
                {#if dashMessage}
                    {#if message.content.includes("https://")}
                        <span>
                            {message.sender}: {@html renderMessageWithLink(message.content)}
                        </span>
                    {:else}
                        {message.sender}: {message.content}
                    {/if}
                {:else}
                    {#if message.content.includes("https://")}
                        <span>
                            {message.sender}: {@html renderMessageWithLink(message.content)}
                        </span>
                    {:else}
                        {message.sender}: {message.content}
                    {/if}
                {/if}
            </div>
            <div class="text-gray-500 text-sm flex-shrink-0 mr-7">
                at {timeConverter(message.sent_at)} {showDate ? (message.send_date) : ''}
            </div>
        </div>
        <img src={message.image_url} alt="Image" class="chat-image mt-2" />
    {:else}
        <div class="message-content flex justify-between items-center">
            <div>
                {#if dashMessage}
                    {#if message.content.includes("https://")}
                        <span>
                            {message.sender}: {@html renderMessageWithLink(message.content)}
                        </span>
                    {:else}
                        {message.sender}: {message.content}
                    {/if}
                {:else}
                    {#if message.content.includes("https://")}
                        <span>
                            {message.sender}: {@html renderMessageWithLink(message.content)}
                        </span>
                    {:else}
                        {message.sender}: {message.content}
                    {/if}
                {/if}
            </div>
            <div class="text-gray-500 text-sm flex-shrink-0 mr-7">
                at {timeConverter(message.sent_at)} {showDate ? (message.send_date) : ''}
            </div>
        </div>
    {/if}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer absolute right-2 hidden group-hover:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        on:click={() => copyToClipboard(message.content)}
    >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2H8zm-1 4h10m-5-5v4" />
    </svg>
</div>

<style>
    .chat-image {
        max-width: 40%; /* Ensures the image fits within the message container */
        height: auto;    /* Keeps aspect ratio */
        border-radius: 0.5rem; /* Optional: Rounded corners */
        margin-top: 0.5rem; /* Optional: Space above the image */
    }

    .message-content {
        display: flex;
        gap: 0.5rem; /* Optional: Space between text elements */
    }
</style>
