<script>
    import { supabase, fetchMessages, insertMessage } from '$lib/supabaseClient.js';
    import messageStore from '$lib/stores/messageStore';
    import { onMount } from 'svelte';
    import MessageWindow from '$lib/components/message-window.svelte';
    //import MessageInput from '$lib/components/message-input.svelte';
    import { Toaster } from 'svelte-sonner';

    let messages = [{}];
    let currentBoard = "general";
    let username = '';
    let message = "";

    onMount(async () => {
        const { data } = await supabase
            .from("messages")
            .select();
        messageStore.set(data.reverse());
    });

    supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'messages' },
            () => {
                fetchMessages()
                    .then((data) => {
                        messageStore.set(data.reverse());
                    });
            }
        )
        .subscribe();

    messageStore.subscribe((data) => {
        messages = data.sort((a, b) => a.sent_at - b.sent_at).reverse();
    });

</script>

<Toaster position="bottom-right" richColors />

<main class="h-screen w-screen bg-slate-50">
    <div class="flex flex-col items-center justify-center h-full">
        <div class="w-full max-w-4xl p-4">
            <MessageWindow {messages} {currentBoard} />
            <!-- <MessageInput {message} {username} {sendMessage} /> -->
        </div>
    </div>
</main>
