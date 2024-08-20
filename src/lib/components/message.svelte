<script>
    export let message;

    function toggleHover() {
        messageHovered = !messageHovered;
    }

    function renderMessageWithLink(content) {
        const parts = content.split(' ');
        return parts.map(part => {
            if (part.startsWith('https://')) {
                return `<a href="${part}" target="_blank" class="text-blue-500 hover:text-blue-700 no-underline">${part}</a>`;
            } else if (part.startsWith('@')) {
                return `<span class="text-blue-500">${part}</span>`;
            } else {
                return part;
            }
        }).join(' ');
    }
</script>

<div class={`relative flex flex-row justify-between p-2 rounded-lg group`} 
     role="region" 
     on:mouseenter={toggleHover} on:mouseleave={toggleHover}>
    <div class="flex flex-col justify-center flex-grow">
        <div class="message-content flex w-full gap-2">
            <div>
                {#if message.content.includes("https://")}
                    <span>
                        {message.sender}: {@html renderMessageWithLink(message.content)}
                    </span>
                {:else}
                    {message.sender}: {@html renderMessageWithLink(message.content)}
                {/if}
            </div>
        </div>
    </div>
</div>
