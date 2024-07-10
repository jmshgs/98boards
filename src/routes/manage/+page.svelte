<script>
    import { supabase } from '$lib/supabaseClient.js';
    import messageStore from '$lib/stores/messageStore';
    import { onMount, onDestroy } from 'svelte';
    import { timeConverter } from '$lib/main.js'

    let messages = [];

    // Subscribe to Supabase changes
    const channel = supabase.channel('custom-all-channel')
    .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        () => {
            fetchMessages()
            .then((data) => {
                messageStore.set(data.reverse());
            })
        }
    )
    .subscribe();

    // Subscribe to message store
    const unsubscribe = messageStore.subscribe((data) => {
        messages = data.sort((a, b) => a.sent_at - b.sent_at).reverse();
    });

    // Function to fetch messages from Supabase
    async function fetchMessages() {
        let { data: messages, error } = await supabase
            .from('messages')
            .select('*');

        if (error) console.error(error);
        return messages;
    }

    // Function to delete a message
    async function deleteMessage(id) {
        const { error } = await supabase
            .from('messages')
            .delete()
            .eq('id', id);

        if (error) {
            console.error(error);
        } else {
            // Fetch messages again to update the store
            fetchMessages().then((data) => {
                messageStore.set(data.reverse());
            });
        }
    }

    // Fetch messages initially and set up interval for periodic fetching
    let interval;
    onMount(() => {
        fetchMessages()
        .then((data) => {
            messageStore.set(data.reverse());
        });

        interval = setInterval(() => {
            fetchMessages()
            .then((data) => {
                messageStore.set(data.reverse());
            });
        }, 2000); // Fetch every 5 seconds
    });

    // Clean up interval on component destroy
    onDestroy(() => {
        clearInterval(interval);
        unsubscribe(); // Unsubscribe from the message store
    });
</script>

<style>
    .hover-show {
        opacity: 0;
        transition: opacity 0.2s;
    }
    tr:hover .hover-show {
        opacity: 1;
    }
</style>

<table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
        <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent At</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Board</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
            <th class="relative px-6 py-3">
                <span class="sr-only">Delete</span>
            </th>
        </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
        {#each messages as message}
        <tr class="hover:bg-gray-100 transition duration-150 ease-in-out">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{message.sender}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{message.content}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{timeConverter(message.sent_at)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.board}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.sender_ip}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="hover-show text-red-600 hover:text-red-900" on:click="{() => deleteMessage(message.id)}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </td>
        </tr>
        {/each}
    </tbody>
</table>
