<script>
	import { supabase, fetchMessages, insertMessage} from '$lib/supabaseClient.js'
	import { timeConverter, changeTheme } from '$lib/main.js'
	import messageStore from '$lib/stores/messageStore';
	import timestamp from 'unix-timestamp';
	import { Spinner } from 'flowbite-svelte'
	import { onMount } from 'svelte';
	import Account from '$lib/components/account.svelte'
	import Settings from '$lib/components/settings.svelte'

	import Sidebar from '$lib/components/sidebar.svelte';
	import Oops from '$lib/components/oops.svelte';
	import JoinBoard from '$lib/components/joinboard.svelte';

	import CreateBoard from '$lib/components/createboard.svelte';
	import MessageWindow from '$lib/components/message-window.svelte';
	import MessageInput from '$lib/components/message-input.svelte';

	let oldUI = false;

	let dashMessage = false;
	let messagesTop = true;

	let themeColor = "auto";
	let themesCSS = ""

	let fontCSS = "font-apple"

	$: newButtonClass = `${oldUI ? "" : "rounded-full border-gray-800 border-2" } ${themesCSS}`

	let message = "";

	let currentBoard = "general";
	let username = 'anon';

	let showLogin = false;
	let showSettings = false;

	let createBoard = false;
	let joinBoard = false;

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
		themesCSS = changeTheme(themeColor)
		promise = (async () => {
			const { data, error } = await supabase
				.from("messages")
				.select()
			messageStore.set(data.reverse());
		})()
		if (supabase.user) {
			let id;
			fetchUser()
			.then(data => {
				if (data) {
					id = data.id
					console.log("got the data")
					console.log(id)
					fetchUsername(id)
					.then(data => {
						console.log(data)
						username = data[0].username;
					})
				}
			})
		}
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
		messages = data.sort((a,b) => a.sent_at - b.sent_at).reverse();	
	})
	
	const sendMessage = async(message) => {
		if (message === "") {
			return;
		}
		if (messages[0]) {

			if (message == messages[0].content && messages[0].sender == username) {
				alert("you can't send the same message twice :)")
				return;
			}
			if (timestamp.now() - messages[0].sent_at < 1 && username == messages[0].sender) {
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

</script>

<svelte:window on:keypress={(e) => {
	if (e.key == "Escape") {
		showLogin = false;
		showSettings = false;
		createBoard = false;
	}
}} />
{#if oldUI}
<link rel="stylesheet" href="https://unpkg.com/98.css" />
{/if}
<main class="{fontCSS} h-screen w-screen {oldUI ? "bg-gray-300" : "bg-slate-50"} {themesCSS}">
	<!-- account modal -->
	{#if showLogin}
	<button class="z-10 fixed flex h-screen w-screen items-center justify-center {themesCSS}"
	on:click={() => {
		showLogin = false
	}}>
		<button on:click|stopPropagation>
			<Account {oldUI} {themesCSS} bind:username={username}/>
		</button>
	</button>	
	{/if}
	<!-- settings modal -->
	{#if showSettings}
	<button class="z-10 fixed flex h-screen w-screen items-center justify-center {themesCSS}"
	on:click={() => {
		showSettings = false
	}}>
		<button on:click|stopPropagation>
			<Settings bind:messagesTop={messagesTop} bind:dashMessage={dashMessage} bind:themeColor={themeColor} bind:themesCSS={themesCSS} bind:fontCSS={fontCSS} {oldUI}/>
		</button>
	</button>	
	{/if}
	<!-- create board modal-->
	{#if createBoard}
	<button class="z-10 fixed flex h-screen w-screen items-center justify-center {themesCSS}"
	on:click={() => {
		createBoard = false
	}}>
		<button on:click|stopPropagation>
			<CreateBoard {themesCSS} bind:boards={boards}/>
		</button>
	</button>
	{/if}
	<!-- join board modal -->
	{#if joinBoard}
	<button class="z-10 fixed flex h-screen w-screen items-center justify-center {themesCSS}"
	on:click={() => {
		joinBoard = false
	}}>
		<button on:click|stopPropagation>
			<JoinBoard {themesCSS} bind:boards={boards} />
		</button>
	</button>
	{/if}

	<div class="space-x-10 flex flex-row {themesCSS}" class:blur-md={showLogin || showSettings}> 
		<Sidebar bind:boards={boards} bind:createBoard={createBoard} bind:joinBoard={joinBoard} bind:currentBoard={currentBoard} bind:oldUI={oldUI} bind:showLogin={showLogin} bind:showSettings={showSettings} {fontCSS} {themeColor} {themesCSS} {newButtonClass}/>
		{#await promise}
		<div class="flex w-screen h-screen justify-center items-center">
			<Spinner color="blue" />
		</div>
		{:then}
		<div class="px-4 justify-start flex">
			<div class="lg:w-[75vw] w-[60vw] h-[80vh] justify-center p-4">
				<MessageWindow {oldUI} {messages} {currentBoard} {messagesTop} {dashMessage}/>
				<MessageInput {message} {username} {themesCSS} {sendMessage}/>
			</div>
		</div>
		{/await}
	</div>
</main>