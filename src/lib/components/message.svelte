<script>
    import { timeConverter } from '$lib/main.js'

    export let dashMessage;
    export let message;
    export let showHighlight;
    export let showDate;
    export let messageClass = ''; // Renamed to avoid conflict

    function renderMessageWithLink(content) {
        const parts = content.split(' ');
        return parts.map(part =>
            part.startsWith('https://')
                ? `<a href="${part}" target="_blank" class="text-blue-500 hover:text-blue-700 no-underline">${part}</a>`
                : part
        ).join(' ');
    }
</script>

<div class={showHighlight ? messageClass : ""}>
    {#if dashMessage}
        {#if message.content.includes("https://")}
            <span>
                {message.sender}: {@html renderMessageWithLink(message.content)} - {timeConverter(message.sent_at)} {showDate ? (message.send_date) : ''}
            </span>
        {:else}
            {message.sender}: {message.content} - {timeConverter(message.sent_at)} {showDate ? (message.send_date) : ''}

        {/if}
    {:else}
        {#if message.content.includes("https://")}
            <span>
                {message.sender}: {@html renderMessageWithLink(message.content)} @ {timeConverter(message.sent_at)} {showDate ? (message.send_date) : ''}

            </span>
        {:else}
            {message.sender}: {message.content} @ {timeConverter(message.sent_at)} {showDate ? (message.send_date) : ''}

        {/if}
    {/if}
</div>

