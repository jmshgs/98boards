<script>
	import { supabase, fetchMessages, insertMessage } from '$lib/supabaseClient.js'
	import { onMount } from 'svelte';
	import messageStore from '$lib/stores/messageStore';

	onMount(
		fetchMessages()
		.then((data) => {
			messageStore.set(data.reverse());
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
			messageStore.set(data.reverse());
		})
	}, 500)

	messageStore.subscribe((data) => {
		messages = data;
	})

	const sendMessage = async(message) => {
		if (message === "") {
			return;
		}
		let newMessage = {
			content: message,
			board: "general",
		}
		messageStore.update(messages => {
			return [newMessage, ...messages]
		})
		await insertMessage(newMessage);
	}
</script>
<main class="font-apple">
	<aside class="font-sans fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
		<div class="h-full px-3 overflow-y-auto bg-gray-50 dark:bg-gray-800">
			<h1 class="w-full px-4 pt-4 text-xl font-semibold">
				boards:
			</h1>
			<div class="list-none px-4 py-2 space-y-1">
				<li>
					<button class="decoration-none text-slate-800 transition-all hover:scale-[105%]" href="/boards/general">🌐 general</button>
				</li>
				<li>
					<button class="decoration-none text-slate-800 transition-all hover:scale-[105%]" href="/boards/programming">💻 programming</button>
				</li>
				<li>
					<button class="decoration-none text-slate-800 transition-all hover:scale-[105%]" href="/boards/technology">📱 technology</button>
				</li>
				<li>
					<button class="decoration-none text-slate-800 transition-all hover:scale-[105%]" href="/boards/philosophy">🧐 philosophy</button>
				</li>
				<li>
					<button class="decoration-none text-slate-800 transition-all hover:scale-[105%]" href="/boards/other">🔭 other</button>
				</li>
			</div>
		</div>
	</aside>
</main>
<style> 
</style>