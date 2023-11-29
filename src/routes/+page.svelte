<script>
	import { supabase, fetchMessages, insertMessage, fetchUsername, fetchUser } from '$lib/supabaseClient.js'
	import { timeConverter } from '$lib/main.js'
	import messageStore from '$lib/stores/messageStore';
	import timestamp from 'unix-timestamp';
	import { P, Spinner } from 'flowbite-svelte'
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Account from '$lib/components/account.svelte'

	let oldUI = false;

	$: newButtonClass = oldUI ? "" : "rounded-full bg-slate-200 border-gray-800 border-2";

	let message = "";

	let currentBoard = "general";
	let displayOption = "time-message";
	let username = 'anon';

	let showLogin = false;
	let showSignup = false;

	let messages = [{}];
	let boards = [
		"general",
		"programming",
		"technology",
		"philosophy",
		"photography",
		"art",
		"music",
		"gaming",
		'random',
		'school'
	];

	

	let promise = new Promise(() => {});
	onMount(() => {
		promise = (async () => {
			const { data, error } = await supabase
				.from("messages")
				.select()
			messageStore.set(data.reverse());
		})()
		let id;
		fetchUser()
		.then(data => {
			id = data.id
			console.log("got the data")
			console.log(id)
			fetchUsername(id)
			.then(data => {
				console.log(data)
				username = data[0].username;
			})
		})

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
		//messages = data
		messages = data.sort((a,b) => a.sent_at - b.sent_at).reverse();
	})
	
	const sendMessage = async(message) => {
		if (message === "") {
			return;
		}
		if (messages[0]) {

			if (message == messages[0].content) {
				alert("you can't send the same message twice :)")
				return;
			}
			if (timestamp.now() - messages[0].sent_at < 1) {
				alert("you can't send messages that fast :)")
				return;
			}
		}
		let newMessage = {
			content: message,
			sent_at: timestamp.now(),
			sender: username, //TODO add user auth
			board: currentBoard,
		}
		messageStore.update(messages => {
			return [newMessage, ...messages]
		})
		await insertMessage(newMessage);
	}

	function changeDisplay() {
		if (displayOption == "time-message") {
			displayOption = "message-time";
		} else {
			displayOption = "time-message";
		};
	}
</script>

<svelte:window on:keypress={(e) => {
	if (e.key == "Escape") {
		showLogin = false;
	}
}} />
{#if oldUI}
<link rel="stylesheet" href="https://unpkg.com/98.css" />
{/if}
<main class="font-apple h-screen w-screen {oldUI ? "bg-gray-300" : "bg-slate-50"} dark:bg-gray-800 text-slate-800 dark:text-white">
	{#if showLogin}
	<button class="z-10 fixed flex h-screen w-screen items-center justify-center bg-gray-700/25"
	on:click={() => {
		showLogin = false
	}}>
		<button on:click|stopPropagation>
			<Account {oldUI} {username} titleText="Sign in to your account" />
		</button>
	</button>	
	{/if}
	<div class="space-x-10 flex flex-row" class:blur-md={showLogin}>
		<aside class="font-sans lg:w-64 w-96 h-screen transition-transform bg-gray-100 dark:bg-gray-900" class:window={oldUI} aria-label="Sidebar">
			<div class="h-full px-3 overflow-y-auto flex-col">
				<div class="justify-start items-start">
					<h1 class="w-full pt-4 text-xl font-semibold dark:text-white" class:px-4={!oldUI}>
						boards:
					</h1>
					<ul class="list-none px-4 py-2 space-y-1.5" class:tree-view={oldUI}>
						{#each boards as board}
						<li>
							{#if !oldUI}
							<button class="decoration-none transition-all hover:scale-[105%]" class:scale-[105%]={currentBoard == board} class:text-blue-800={currentBoard == board} on:click={() => {
								currentBoard = board;
							}}>{board}</button>
							{:else}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
							<p class="decoration-none transition-all hover:scale-[105%] hover:pl-2" class:scale-[102%]={currentBoard == board} class:font-bold={currentBoard == board} class:pl-0.5={currentBoard == board} on:click={() => {
								currentBoard = board;
							}}>{board}</p>
							{/if}
						</li>
						{/each}
					</ul>
				</div>
				<div class="flex items-end">
					<button class="justify-center flex w-full p-2 m-2 {newButtonClass}" on:click={() => {
						oldUI = !oldUI;
					}}>
						old ui
					</button>
				</div>
				<div class="flex items-end">
					<button class="justify-center flex w-full p-2 m-2 {newButtonClass}" on:click={() => {changeDisplay()}}>
						display mode
					</button>
				</div>
				<div class="flex items-end">
					<button class="justify-center flex w-full p-2 m-2 {newButtonClass}" on:click={() => {
						showLogin = true;
					}}>
						account
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
				<div class:window={oldUI}>
					<div class="px-4">
						<h1 class="text-xl font-semibold py-2">
							messages:
						</h1>
						<div class="h-[75vh] overflow-y-auto overflow-x-scroll">
							{#each messages as message}
							{#if message.board == currentBoard}
								<div class="w-[70vw]">
									{#if displayOption == "time-message"}
									{timeConverter(message.sent_at)} - {message.sender}: {message.content}
									{/if}
									{#if displayOption == "message-time"}
									{message.sender}: {message.content} @ {timeConverter(message.sent_at)}
									{/if}
								</div>
							{/if}
							{/each}
						</div>
						
					</div>
				</div>
				<div class="overflow-y-auto overflow-x-scroll py-4 space-x-4 flex items-center justify-center">
					<input on:keypress={
						(e) => {
							if (e.key === "Enter") {
								sendMessage(message);
								message = "";
							}
						} 
						} type="text" name="message" id="message" class="bg-gray-50 border-gray-300 text-black rounded-xl w-[71.5vw] p-2.5 m-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 border-2 dark:text-white focus:outline-none" placeholder="say hello, {username}" bind:value={message}>
				</div>
			</div>
		</div>
		{/await}
	</div>
</main>