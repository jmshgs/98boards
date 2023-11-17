<script>
	import { supabase, fetchMessages, insertMessage } from '$lib/supabaseClient.js'
	import { timeConverter } from '$lib/main.js'
	import messageStore from '$lib/stores/messageStore';
	import timestamp from 'unix-timestamp';
	import { Spinner } from 'flowbite-svelte'
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let message = "";
	let messages = [
		{
			content: "hello world",
			board: "general"
		},
	];

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
<link rel="stylesheet" href="https://unpkg.com/98.css" />
<main class="font-apple h-screen w-screen space-x-10 flex flex-row bg-gray-300">
	<aside class="font-sans lg:w-64 w-96 h-screen transition-transform bg-gray-100" aria-label="Sidebar">
		<div class="px-3 overflow-y-auto window">
			<h1 class="w-full px-4 pt-4 text-xl font-semibold dark:text-white">
				boards:
			</h1>
			<ul class="list-none w-fi px-4 py-2 space-y-1.5 tree-view">
				<li>
					<button class="decoration-none transition-all hover:scale-[105%]" href="/boards/general">general</button>
				</li>
				<li>
					<button class="decoration-none transition-all hover:scale-[105%]" href="/boards/programming">programming</button>
				</li>
				<li>
					<button class="decoration-none transition-all hover:scale-[105%]" href="/boards/technology">technology</button>
				</li>
				<li>
					<button class="decoration-none transition-all hover:scale-[105%]" href="/boards/philosophy">philosophy</button>
				</li>
				<li>
					<button class="decoration-none transition-all hover:scale-[105%]" href="/boards/other">other</button>
				</li>
			</ul>
			<button class="justify-center items-center w-full" on:click={() => {
				goto("/")
			}}>
				new ui
			</button>
		</div>
	</aside>
	{#await promise}
	<div class="flex w-full h-full justify-center items-center">
		<Spinner color="gray" class="" />
	</div>
	{:then}
	<div class="px-4 justify-start flex w-full">
		<div class="lg:w-[75vw] w-[60vw] h-[80vh] justify-center p-4">
			<div class="window">
				<div class="px-4">
					<h1 class="text-xl font-semibold py-2">
						messages:
					</h1>
					<div class="h-[75vh] overflow-y-auto overflow-x-auto">
						{#each messages as message}
								<div class="w-[70vw]">
									{timeConverter(message.sent_at)} - <strong>{message.content}</strong>
								</div>
							{/each}
					</div>
				</div>
			</div>
			<div class="overflow-y-auto py-4 space-x-4 flex items-center justify-center">
				<input on:keypress={
					(e) => {
						if (e.key === "Enter") {
							sendMessage(message);
							message = "";
						}
					} 
					} type="text" name="message" id="message" class="bg-gray-50 border-gray-300 w-[71.5vw] p-2.5 m-1 border-2 focus:outline-none" placeholder="type something here :)" bind:value={message}>
			</div>
		</div>
	</div>
	{/await}
</main>