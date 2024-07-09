<script>
    import { timeConverter } from '$lib/main.js'

    export let dashMessage;
    export let message;

    // Function to extract and render message content with clickable URL
    function renderMessageWithLink(content) {
        // Split the content into parts
        const parts = content.split(' ');
        let result = [];

        parts.forEach(part => {
            if (part.startsWith('https://')) {
                // If the part starts with 'https://', treat it as a URL
                result.push(`<a href="${part}" target="_blank" class="text-blue-500 hover:text-blue-700 no-underline">${part}</a>`);
            } else {
                // Otherwise, treat it as plain text
                result.push(part);
            }
        });

        // Join the result into a single string with spaces between the parts
        return result.join(' ');
    }
</script>

<div class="w-[70vw]">
    {#if dashMessage}
        {#if message.content.includes("https://")}
            <span>
                {message.sender}: {@html renderMessageWithLink(message.content)} - {timeConverter(message.sent_at)}
            </span>
        {:else}
            {message.sender}: {message.content} - {timeConverter(message.sent_at)} 
        {/if}
    {:else}
        {#if message.content.includes("https://")}
            <span>
                {message.sender}: {@html renderMessageWithLink(message.content)} @ {timeConverter(message.sent_at)}
            </span>
        {:else}
            {message.sender}: {message.content} @ {timeConverter(message.sent_at)} 
        {/if}
    {/if}
</div>
