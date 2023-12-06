<script>
    import { timeConverter } from '$lib/main.js'

    export let timeFirst;
    export let message;
</script>

<div class="w-[70vw]"> 
    {#if timeFirst}
    {#if message.content.includes("https://")}
    <a href={message.content} target="_blank"> 
        {timeConverter(message.sent_at)} - {message.sender}: <span class="text-blue-500 hover:text-blue-700 no-underline">{message.content}</span>
    </a>
{:else}
    {timeConverter(message.sent_at)} - {message.sender}: {message.content}
{/if}
{:else}
{#if message.content.includes("https://")}
    <a href={message.content} target="_blank"> 
        {message.sender}: <span class="text-blue-500 hover:text-blue-700 no-underline">{message.content}</span> - {timeConverter(message.sent_at)}
    </a>
{:else}
    {message.sender}: {message.content} @ {timeConverter(message.sent_at)}
{/if}
{/if}
</div>