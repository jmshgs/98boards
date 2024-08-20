<script>
    import Message from '$lib/components/message.svelte';

    export let oldUI;
    export let messages;
    export let currentBoard;
    export let dashMessage;
    export let showHighlight;
    export let showDate;
    export let showImages;
    export let username;

    let latestMessage = null;

    $: {
        const filteredMessages = messages.filter(message => message.board === currentBoard);
        if (filteredMessages.length > 0) {
            latestMessage = filteredMessages.reduce((latest, message) =>
                message.timestamp > latest.timestamp ? message : latest
            );
        } else {
            latestMessage = null;
        }
    }
</script>

<div class:window={oldUI}>
    <div>
        <h1 class="text-xl font-semibold py-2">messages:</h1>
        <div class="h-[75vh] overflow-y-auto flex flex-col-reverse align-bottom">
            {#each messages as message (message.id)}
                {#if message.board === currentBoard}
                    <Message 
                        username={username}
                        dashMessage={dashMessage} 
                        message={message}
                        showHighlight={showHighlight} 
                        showDate={showDate}
                        showImages={showImages}
                        messageClass={message === latestMessage ? 'bg-gray-200' : ''}
                    />
                {/if}
            {/each}
        </div>
    </div>
</div>
