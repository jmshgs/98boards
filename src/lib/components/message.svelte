<script>
    import { toast } from 'svelte-sonner';
    import { timeConverter } from '$lib/main.js';
    import { getPlayedSound, markSoundAsPlayed, downloadFile } from '$lib/supabaseClient.js';
    import { CopyIcon, DownloadIcon, FileIcon, CornerUpLeftIcon, CornerLeftDownIcon, EditIcon } from 'svelte-feather-icons';
    import { Button } from "$lib/components/ui/button";

    export let message;
    export let messages;
    export let showDate;
    export let showImages;
    export let username = '';
    export let isReplying = false;
    export let replyTo = null;
    export let isEditing;
    export let isMobile;

    let messageHovered = false;

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
        const bucketIndex = parts.indexOf('images') + 2;
        return parts.slice(bucketIndex).join('/');
    }

    function extractFilePathImage(fullUrl) {
        const parts = fullUrl.split('/');
        const bucketIndex = parts.indexOf('images') + 1;
        return parts.slice(bucketIndex).join('/');
    }

    async function handleDownload(fullUrl) {
        try {
            const filePath = extractFilePathImage(fullUrl);
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

    function ReplyToMessage(message) {  
        toggleReply();
        replyTo = message.id;
    }

    function EditMessage(message) {
        toggleEdit();
        replyTo = message.id;
    }

    function toggleReply() {
        isReplying = !isReplying;
    }

    function toggleEdit() {
        isEditing = !isEditing;
    }

    function getMessageById(id) {
        return messages.find(msg => msg.id === id);
    }
    
    $: originalMessage = getMessageById(message.replyTo);
</script>

<div class={`relative flex flex-row justify-between p-2 md:p-4 rounded-lg group w-full`} 
     role="region"
     on:mouseenter={toggleHover} on:mouseleave={toggleHover}>
    <div class="flex flex-col justify-center flex-grow">
        <div class="message-content flex w-full gap-2">
            <div> 
                {#if message.replyTo}
                    <div>
                        <Button class="w-6 h-6 p-1" variant="ghost">
                            <CornerLeftDownIcon size="20" class="stroke-gray-400"/> 
                        </Button>                    
                        <span class="text-gray-500">Replying to {originalMessage.sender}: {originalMessage.content} </span> 
                    </div>
                {/if}
                <span class="text-sm md:text-base">
                    {message.sender}: {@html renderMessageWithLink(message.content)}   
                    {#if isMobile && messageHovered}
                    
                        <span class="text-gray-500 text-sm ">
                            at {timeConverter(message.sent_at)} {showDate ? message.send_date : ''}
                        </span>        
                        {#if isMobile}
                            <div class="flex items-center space-x-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            {#if message.content}
                                <Button class="w-8 h-8 p-0" variant="ghost" on:click={() => copyToClipboard(message.content)}>
                                    <CopyIcon size="20"/> 
                                </Button>
                                {/if}
                                {#if message.content && message.sender == username}
                                <Button class="w-8 h-8 p-0" variant="ghost" on:click={() => EditMessage(message)}>
                                    <EditIcon size="20"/> 
                                </Button>
                                {/if}
                                {#if message.file_url}
                                <Button class="w-8 h-8 p-0" variant="ghost" on:click={() => handleDownload(message.file_url)}>
                                    <DownloadIcon size="20"/> 
                                </Button>
                                {/if}
                                <Button class="w-8 h-8 p-0" variant="ghost" on:click={() => ReplyToMessage(message)}>
                                    <CornerUpLeftIcon size="20"/> 
                                </Button>
                            </div>
                        
                        {/if}
    
                    {/if}
                </span>
            </div>
        </div>
        {#if message.file_url && message.file_type && showImages}
            {#if message.file_type.startsWith('image/')}
                <img src={message.file_url} alt class="chat-image mt-2 max-w-full md:max-w-2/5 rounded-lg" />
            {:else}
                <div class="flex items-center space-x-2">
                    <Button class="w-8 h-8 p-0" variant="ghost">
                        <FileIcon size="20" class="stroke-gray-400"/> 
                    </Button>            
                    <span class="text-gray-400"> {extractFilePath(message.file_url) || 'Downloadable File'}</span>
                </div>
            {/if}
        {/if}
    </div>
    {#if !isMobile} <!-- fix mobile -->
    <div class="flex items-center space-x-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div class="text-gray-500 text-sm">
            at {timeConverter(message.sent_at)} {showDate ? message.send_date : ''}
        </div>
        {#if message.content}
        <Button class="w-8 h-8 p-0" variant="ghost" on:click={() => copyToClipboard(message.content)}>
            <CopyIcon size="20"/> 
        </Button>
        {/if}
        {#if message.content && message.sender == username}
        <Button class="w-8 h-8 p-0" variant="ghost" on:click={() => EditMessage(message)}>
            <EditIcon size="20"/> 
        </Button>
        {/if}
        {#if message.file_url}
        <Button class="w-8 h-8 p-0" variant="ghost" on:click={() => handleDownload(message.file_url)}>
            <DownloadIcon size="20"/> 
        </Button>
        {/if}
        <Button class="w-8 h-8 p-0" variant="ghost" on:click={() => ReplyToMessage(message)}>
            <CornerUpLeftIcon size="20"/> 
        </Button>
    </div>
    {/if}
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

</style>
