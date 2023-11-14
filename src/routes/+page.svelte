<script>
    import { supabase, fetchMessages, insertMessage } from '$lib/supabaseClient.js'
    import { onMount } from 'svelte';
	import messageStore from '$lib/stores/messageStore';

    onMount(
        fetchMessages()
        .then((data) => {
            messageStore.set(data);
        })
    )

    let message = "";
    let messages = [
        {
            content: "hello world",
            board: "general"
        },
    ];

    setTimeout(() => {
        fetchMessages()
        .then((data) => {
            messageStore.set(data);
        })
    }, 300)

    messageStore.subscribe((data) => {
        messages = data;
    })

    const sendMessage = async(message) => {
        let newMessage = {
            content: message,
            board: "general",
        }
        messageStore.update(messages => {
            return [...messages, newMessage]
        })
        await insertMessage(newMessage);
    }
</script>

<main on:keypress={(e) => {
    if (e.key === "Enter") {
        sendMessage(message);
        message = ""
    }
}}>
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
                        {#each messages as sentMessage}
                        <li class="w-40 translate-x-[2px]">
                            <p class="font-medium">{sentMessage.content}</p>
                        </li>
                        {/each}
                    </ol>
                    
                </ul>
            </div>
            <div class="flex flex-col-reverse">
                <div class="flex flex-row">
                    <div class="field-row">
                        <label for="message"><strong>message:</strong></label>
                        <input name="message" id="message" class="w-[75vh]" bind:value={message} type="text" placeholder="type something here."/>
                    </div>
                    <button class="w-20 h-14 translate-x-5 bg-gray-300" on:click={() => {
                        sendMessage(message);
                        message = ""
                    }}
                    >
                        <strong>post</strong>
                    </button>
                </div>
            </div>
        </div>
       
    </div>
</main>