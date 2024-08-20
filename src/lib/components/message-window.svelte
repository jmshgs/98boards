<script>
    import Message from '$lib/components/message.svelte';

    export let messages;
    export let currentBoard;
    export let username;

    let latestMessage = null;

    $: {
        const filteredMessages = messages.filter(message => message.board === currentBoard);
        if (filteredMessages.length > 0) {
            latestMessage = filteredMessages.reduce((latest, message) =>
                message.sent_at > latest.sent_at ? message : latest
            );
        } else {
            latestMessage = null;
        }
    }
</script>

<h1 class="text-xl font-semibold py-2">messages:</h1>
<div class="h-[75vh] overflow-y-auto flex flex-col-reverse align-bottom">
    {#each messages as message (message.id)}
            {#if message.board === currentBoard}
                <Message 
                    username={username}
                    message={message}
                />
            {/if}
    {/each}
</div>
