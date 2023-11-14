<script>
    import { supabase, sendMessage } from '$lib/supabaseClient.js'
    import { onMount } from 'svelte';

    let message = "";

    $: supabase
        .channel('table-db-changes')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
            console.log('Change received!', payload)
        })
        .subscribe()
</script>

<main>
    <link rel="stylesheet" href="https://unpkg.com/98.css" />
    <div class="flex h-screen flex-row">
        <div class="p-2">
            <ul class="tree-view w-44 h-[98vh]">
                <ol class="pl-1">
                    <strong>
                        boards:
                    </strong>
                </ol>
                <button class="w-40 translate-x-[2px]" on:click={() => {
                    print();
                }}>
                    <strong>/general</strong>
                </button>
            </ul>
        </div>
        <div class="flex flex-col p-5 space-y-32">
            <div class="window w-[50vw] h-[88vh]">
                <ul class="message-view ">
                    <ol class="pl-1">
                        <strong>
                            messages:
                        </strong>
                    </ol>
                    <li class="w-40 translate-x-[2px]">
                        <strong>{message}</strong>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col-reverse">
                <div class="flex flex-row">
                    <div class="field-row">
                        <label for="message"><strong>message:</strong></label>
                        <textarea name="message" id="message" class="w-[75vh]" bind:value={message} type="text" rows="3" placeholder="type something here."/>
                    </div>
                    <button class="w-20 h-14 translate-x-5 bg-gray-300" on:click={() => {
                        sendMessage(message, "general");
                    }}>
                        <strong>post</strong>
                    </button>
                </div>
            </div>
        </div>
       
    </div>
</main>