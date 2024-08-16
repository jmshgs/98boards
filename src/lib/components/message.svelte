<script>
    import { Toaster, toast } from 'svelte-sonner';
    import { timeConverter } from '$lib/main.js';
    import { getPlayedSound, markSoundAsPlayed } from '$lib/supabaseClient.js';
    import { CopyIcon } from 'svelte-feather-icons';
    import { Button } from "$lib/components/ui/button";
    export let dashMessage;
    export let message;
    export let showHighlight;
    export let showDate;
    export let showImages;
    export let messageClass = '';
    export let username = '';

    let messageHovered=false;

    let audio = new Audio('/sounds/ping.mp3');
    let soundPlayed = false;

    function toggleHover() {
        messageHovered = !messageHovered;
    }

    async function checkAndPlaySound() {
        if (username && message.id && !isNaN(message.id)) {
            const playedSound = await getPlayedSound(message.id);
            if (!playedSound && playedSound != null && message.content.includes(`@${username}`)) {
                audio.play();
                soundPlayed = true;
                await markSoundAsPlayed(message.id);
            }
        }
    }

    $: if (message.content) {
        soundPlayed = false;
        checkAndPlaySound();
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

    function copyToClipboard(content) {
        try {
            navigator.clipboard.writeText(content);
            toast.success("Copied To Clipboard!");
        } catch (err) {
            toast.error("Failed to copy: " + err);
        }
    }
</script>

<div class={`${showHighlight ? messageClass : ""} rounded-lg p-2 flex flex-row justify-between relative group`} on:mouseenter={toggleHover} on:mouseleave={toggleHover}>
    <div class="flex flex-col justify-center flex-grow">
        <div class="message-content flex w-full">
            <div>
                {#if dashMessage}
                    {#if message.content.includes("https://")}
                        <span>
                            {message.sender}: {@html renderMessageWithLink(message.content)}
                        </span>
                    {:else}
                        {message.sender}: {@html renderMessageWithLink(message.content)}
                    {/if}
                {:else}
                    {#if message.content.includes("https://")}
                        <span>
                            {message.sender}: {@html renderMessageWithLink(message.content)}
                        </span>
                    {:else}
                        {message.sender}: {@html renderMessageWithLink(message.content)}
                    {/if}
                {/if}
            </div>
        </div>
        {#if message.image_url && showImages}
            <img src={message.image_url} alt="Image" class="chat-image mt-2" />
        {/if}
    </div>
    <div class="flex-shrink-0 flex items-center space-x-2 copy-icon-container">
        <div class="text-gray-500 text-sm">
            at {timeConverter(message.sent_at)} {showDate ? (message.send_date) : ''}
        </div>
        <Button class="w-8 h-8 p-0" variant="ghost" on:click={() => copyToClipboard(message.content)}>
            <CopyIcon size="20"/> 
        </Button>
    </div>
</div>

<style>
    .chat-image {
        max-width: 40%;
        height: auto;
        border-radius: 0.5rem;
        margin-top: 0.5rem;
    }

    .message-content {
        display: flex;
        gap: 0.5rem;
    }

    .copy-icon-container {
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
    }

    .group:hover .copy-icon-container {
        opacity: 1;
    }
</style>
