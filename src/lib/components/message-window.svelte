<script>
	import Message from '$lib/components/message.svelte';

    export let oldUI;
    export let messages;
    export let currentBoard;
    export let messagesTop;
    export let dashMessage;
</script>

<div class:window={oldUI}>
    <div class="px-4">
        <h1 class="text-xl font-semibold py-2">
            messages:
        </h1>
        <div class="h-[75vh] overflow-y-auto flex {messagesTop ? "flex-col" : "flex-col-reverse align-bottom"}">
            {#each messages as message}
                {#if message.board == currentBoard} 
                    <Message {dashMessage} {message} />
                {/if}
            {/each}
        </div>
        
    </div>
</div>