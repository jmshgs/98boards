<script>
    import { supabase, fetchMessages } from '$lib/supabaseClient.js'
    import MessageWindow from '$lib/components/message-window.svelte';
	import messageStore from '$lib/stores/messageStore';


	let messages = [{}];

    supabase.channel('custom-all-channel')
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
	.subscribe()

	messageStore.subscribe((data) => {
		messages = data.sort((a,b) => a.sent_at - b.sent_at).reverse();	
	})

</script>

<MessageWindow {messages} />