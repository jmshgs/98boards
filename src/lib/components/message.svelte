<script>
    import { Toaster, toast } from 'svelte-sonner';
    import { timeConverter } from '$lib/main.js';
    import { getPlayedSound, markSoundAsPlayed } from '$lib/supabaseClient.js'; // Import your functions
    import { CopyIcon } from 'svelte-feather-icons'
    import { Button } from "$lib/components/ui/button";
    export let dashMessage;
    export let message;
    export let showHighlight;
    export let showDate;
    export let showImages;
    export let messageClass = ''; // Renamed to avoid conflict
    export let username = ''; // Initialize username with an empty string

    let audio = new Audio('/sounds/ping.mp3'); // Replace with the path to your sound file
    let soundPlayed = false; // Flag to track if the sound has been played
    
    let messageHovered = false
    
    function toggleHover() {
        messageHovered = !messageHovered
    }

    async function checkAndPlaySound() {
        // Ensure message.id is defined and is a number
        if (username && message.id && !isNaN(message.id)) {
            const playedSound = await getPlayedSound(message.id); // Fetch the played_sound status
            if (!playedSound && playedSound != null && message.content.includes(`@${username}`)) {
                audio.play();
                soundPlayed = true; // Set the flag to true after playing the sound
                await markSoundAsPlayed(message.id); // Update the played_sound status in the database
            }
        }
    }

    // Reset the flag and check sound when message changes
    $: if (message.content) {
        soundPlayed = false; // Reset flag
        checkAndPlaySound(); // Check and play sound if necessary
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

<div class={`${showHighlight ? messageClass : ""} rounded-lg p-2 flex flex-row relative group`} on:mouseenter={toggleHover} on:mouseleave={toggleHover}>
    <div class="message-content flex w-full justify-between items-center">
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
        <div class="text-gray-500 text-sm flex-shrink-0 mr-7">
            at {timeConverter(message.sent_at)} {showDate ? (message.send_date) : ''}
        </div>
    </div>
    {#if message.image_url && showImages}
        <img src={message.image_url} alt="Image" class="chat-image mt-2" />
    {/if}
    <div class:invisible={!messageHovered} >
        <Button class="w-8 h-8 p-0" variant="ghost" on:click={() => copyToClipboard(message.content)}>
            <CopyIcon size="20"/> 
        </Button>
    </div>
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
