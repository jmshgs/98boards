<script>
    import { toast } from 'svelte-sonner';
    import { timeConverter } from '$lib/main.js';
    import { getPlayedSound, markSoundAsPlayed, downloadFile } from '$lib/supabaseClient.js';
    import { CopyIcon, DownloadIcon } from 'svelte-feather-icons';
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

    $: 
        if (message.content) {
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

    function extractFilePath(fullUrl) {
        const parts = fullUrl.split('/');
        const bucketIndex = parts.indexOf('images') + 1;
        return parts.slice(bucketIndex).join('/');
    }


    async function handleDownload(fullUrl) {
        try {
            const filePath = extractFilePath(fullUrl)
            const { data, error } = await downloadFile(filePath);
            if (error) {
                toast.error('Error downloading file: ' + error.message);
            } else if (data) {
                toast.success('Download started!');
            }
        } catch (err) {
            toast.error('Failed to download: ' + err.message);
        }
    }

</script>

<div class={`relative flex flex-row justify-between p-2 rounded-lg group ${showHighlight ? messageClass : ""}`} 
     on:mouseenter={toggleHover} on:mouseleave={toggleHover}>
    <div class="flex flex-col justify-center flex-grow">
        <div class="message-content flex w-full gap-2">
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
            <img src={message.image_url} alt="Image" class="chat-image mt-2 max-w-2/5 rounded-lg" />
        {/if}
    </div>
    <div class="flex items-center space-x-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div class="text-gray-500 text-sm">
            at {timeConverter(message.sent_at)} {showDate ? message.send_date : ''}
        </div>
        <Button class="w-8 h-8 p-0" variant="ghost" on:click={() => copyToClipboard(message.content)}>
            <CopyIcon size="20"/> 
        </Button>
        {#if message.image_url && showImages}
        <Button class="w-8 h-8 p-0" variant="ghost" on:click={() => handleDownload(message.image_url)}>
            <DownloadIcon size="20"/> 
        </Button>
        {/if}
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
