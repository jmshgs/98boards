<script>
	import { supabase, fetchMessages, insertMessage } from '$lib/supabaseClient.js'
	import { timeConverter } from '$lib/main.js'
	import messageStore from '$lib/stores/messageStore';
	import timestamp from 'unix-timestamp';
	import { Spinner } from 'flowbite-svelte'
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	
	let message = "";
	let currentBoard = "general";

	let messages = [{}];

	let promise = new Promise(() => {});
	onMount(() => {
		promise = (async () => {
			const { data, error } = await supabase
				.from("messages")
				.select()
			messageStore.set(data.reverse());
		})()
	})

	
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
		messages = data;
	})

	const sendMessage = async(message) => {
		if (message === "") {
			return;
		}
		let newMessage = {
			content: message,
			sent_at: timestamp.now(),
			board: "general",
		}
		console.log(newMessage.sent_at);
		messageStore.update(messages => {
			return [newMessage, ...messages]
		})
		await insertMessage(newMessage);
	}
</script>
<main class="font-apple h-screen w-screen space-x-10 flex flex-row bg-gray-50 dark:bg-gray-800 text-slate-800 dark:text-white">
	<aside class="font-sans lg:w-64 w-96 h-screen transition-transform bg-gray-100 dark:bg-gray-900" aria-label="Sidebar">
		<div class="h-full px-3 overflow-y-auto flex-col">
			<div class="justify-start items-start">
				<h1 class="w-full px-4 pt-4 text-xl font-semibold dark:text-white">
					boards:
				</h1>
				<div class="list-none px-4 py-2 space-y-1.5">
					<li>
						<button class="decoration-none transition-all hover:scale-[105%]" href="/boards/general">🌐 general</button>
					</li>
					<li>
						<button class="decoration-none transition-all hover:scale-[105%]" href="/boards/programming">💻 programming</button>
					</li>
					<li>
						<button class="decoration-none transition-all hover:scale-[105%]" href="/boards/technology">📱 technology</button>
					</li>
					<li>
						<button class="decoration-none transition-all hover:scale-[105%]" href="/boards/philosophy">🧐 philosophy</button>
					</li>
					<li>
						<button class="decoration-none transition-all hover:scale-[105%]" href="/boards/other">🔭 other</button>
					</li>
				</div>
			</div>
			<div class="h-[75vh] flex items-end">
				<button class="justify-center flex w-full bg-slate-200 p-2 rounded-full m-2 border-2 border-gray-800" on:click={() => {
					goto("/98")
				}}>
					old ui
				</button>
			</div>
		</div>
	</aside>
	{#await promise}
	<div class="flex w-full h-full justify-center items-center">
		<Spinner color="blue" />
	</div>
	{:then}
	<div class="px-4 justify-start flex">
		<div class="lg:w-[75vw] w-[60vw] h-[80vh] justify-center p-4">
			<h1 class="text-xl font-semibold py-2">
				messages:
			</h1>
			<div class="h-[75vh] overflow-y-auto overflow-x-scroll">
				{#each messages as message}
						<div class="w-[70vw]">
							{timeConverter(message.sent_at)} - {message.content}
						</div>
					{/each}
			</div>
			<div class="overflow-y-auto overflow-x-scroll py-4 space-x-4 flex items-center justify-center">
				<input on:keypress={
					(e) => {
						if (e.key === "Enter") {
							sendMessage(message);
							message = "";
						}
					} 
					} type="text" name="message" id="message" class="bg-gray-50 border-gray-300 text-black rounded-xl w-[71.5vw] p-2.5 m-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 border-2 dark:text-white focus:outline-none" placeholder="type something here :)" bind:value={message}>
			</div>
		</div>
	</div>
	{/await}
</main>