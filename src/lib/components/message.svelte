<script>
    import { toast } from 'svelte-sonner';
    import { CopyIcon, DownloadIcon, FileIcon } from 'svelte-feather-icons';
    import { Button } from "$lib/components/ui/button";
    import { downloadFile } from '$lib/supabaseClient.js';

    export let message;
    export let showHighlight;
    export let messageClass = '';

    let messageHovered = false;

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

    function copyToClipboard(content) {
        try {
            navigator.clipboard.writeText(content);
            toast.success("Copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy: " + err.message);
        }
    }

    function extractFilePath(fullUrl) {
        const parts = fullUrl.split('/');
        return parts.slice(parts.indexOf('images') + 2).join('/');
    }

    async function handleDownload(fullUrl) {
        try {
            const filePath = extractFilePath(fullUrl);
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

<div class={`relative flex justify-between p-2 rounded-lg group ${showHighlight ? messageClass : ""}`} 
     role="region"
     on:mouseenter={toggleHover} on:mouseleave={toggleHover}>
    <div class="flex-grow">
        <div class="message-content">
            <span>{@html renderMessageWithLink(message.content)}</span>
        </div>
        {#if message.file_url && message.file_type}
            {#if message.file_type.startsWith('image/')}
                <img src={message.file_url} alt class="chat-image mt-2 rounded-lg" />
            {:else}
                <div class="flex items-center space-x-2 mt-2">
                    <FileIcon size="20" class="stroke-gray-400" />
                    <span class="text-gray-400">{extractFilePath(message.file_url) || 'Downloadable File'}</span>
                </div>
            {/if}
        {/if}
    </div>
    <div class="flex items-center space-x-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <Button class="w-8 h-8 p-0" variant="ghost" on:click={() => copyToClipboard(message.content)}>
            <CopyIcon size="20" />
        </Button>
        {#if message.file_url}
        <Button class="w-8 h-8 p-0" variant="ghost" on:click={() => handleDownload(message.file_url)}>
            <DownloadIcon size="20" />
        </Button>
        {/if}
    </div>
</div>

<style>
    .chat-image {
        max-width: 40%;
        height: auto;
    }

    .message-content {
        gap: 0.5rem;
    }
</style>
