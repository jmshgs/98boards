<script>
    import { createUser, insertUsername, fetchUser, validateUser } from '$lib/supabaseClient.js';  
    import { createEventDispatcher } from 'svelte';

    export let oldUI = false;
	export let themesCSS;
	export let themeColor;
  
    const dispatch = createEventDispatcher();

	async function login() {
      let user = {
        email: email,
        password: password
      };

      try {
        const response = await validateUser(user);
        fetchUser()
        console.log('Supabase Response:', response);

        if (response.user) {
          console.log('Logged in successfully!');
        } else {
          console.log('Invalid credentials. Please try again.');
        }

      } catch (error) {
        console.error('Error during login:', error);
        console.log('An error occurred during login. Please try again later.');
      }
    }   


    async function signup() {
        try {
            const response = await createUser(email,username,password);

            if (response && response.user) {
                console.log('Account created successfully!');
                console.log(response.user.id, username)
                insertUsername(username, response.user.id)
            } else {
                console.log('signup error!');
            }
        } catch (error) {
            console.error("Signup error:", error.message);
        }
    }

	import { onMount } from 'svelte'

	let email = "";
	let username = "";
	let password = "";
	let errorMessage = "";

    let creatingAccount = false;
    
	const changeType = () => {
        creatingAccount = !creatingAccount;
    }

	const runAccountMethod = () => {
		if (creatingAccount) {
            signup();
        } else {
            login();
        }
	}

    $: newModalClass = `${oldUI ? "" : "rounded-3xl border-gray-400 border-2 shadow-md"} ${themesCSS}`;
    $: newButtonClass = oldUI ? "" : "text-white bg-blue-600 transition-all hover:bg-blue-800 hover:scale-102 rounded-xl";
    $: newGoogleButtonClass = oldUI ? "" : "bg-blue-600 rounded-xl";
	$: newDarkGooogleButtonClass = oldUI ? "" : "transition-all hover:bg-gray-800 hover:text-white hover:scale-102 rounded-xl text-white bg-grey-800";
	$: newDarkButtonClass = oldUI ? "" : "transition-all hover:bg-gray-800 hover:text-white hover:scale-102 rounded-xl text-white bg-grey-800";
</script>

<div class="w-[28rem] p-4 sm:p-6 md:p-8 text-left {newModalClass}">
	<form class="space-y-6 ">
		<h5 class="text-3xl font-bold {themesCSS}">{creatingAccount ? "create your account" : "sign in to your account"}</h5>
		<div>
			<label for="email" class="block mb-2 text-sm font-medium {themesCSS}">email</label>
			<input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-black text-sm rounded-xl block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:border-blue-600 focus:dark:border-blue-400 focus:border-2 focus:outline-none" placeholder="james@icloud.com" bind:value={email}>
		</div>
		<div>
			<label for="username" class="block mb-2 text-sm font-medium {themesCSS}">username</label>
			<input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-black text-sm rounded-xl block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:border-blue-600 focus:dark:border-blue-400 focus:border-2 focus:outline-none" placeholder="mycoolusername" bind:value={username}>
			{#if errorMessage != ""}
				<p class="text-red-500 dark:text-red-400 font-medium text-xs mr-auto pt-2">{errorMessage}</p>
			{/if}
		</div>
		<div>
			<label for="email" class="block mb-2 text-sm font-medium {themesCSS}">password</label>
			<input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-black text-sm rounded-xl block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:border-blue-600 focus:dark:border-blue-400 focus:border-2 focus:outline-none" placeholder="iLoveThisWebsite12" bind:value={password}>
			{#if errorMessage != ""}
				<p class="text-red-500 dark:text-red-400 font-medium text-xs mr-auto pt-2">{errorMessage}</p>
			{/if}
		</div>
		<div>
			<button type="button" class="w-full font-medium text-sm px-5 py-2.5 text-center {themeColor=='dark' || themeColor=="discord-blue" ? newDarkButtonClass: newButtonClass}" on:click={() => {
				runAccountMethod()
			}}>{creatingAccount ? "create your account" : "sign in to your account"}</button>
			<p class="dark:text-white text-sm text-center p-3 font-medium">
				or
			</p>
			<button type="button" class="w-full transition-all hover:scale-102 font-medium hover:bg-slate-200 hover:dark:bg-slate-300 text-sm px-5 py-2.5 text-center {themeColor=='dark' || themeColor=="discord-blue" ? newDarkGooogleButtonClass: newGoogleButtonClass}" on:click={() => {
				//signInWithGoogle()
			}}>
                {#if !oldUI}
				<img src="/images/google.png" class="inline-block w-5 h-5 mr-2" alt="Google logo">
				continue with google
                {:else}
				continue with <img src="/images/old-google.webp" class="inline-block h-6 mr-2" alt="Google logo">
                {/if}
			</button>
		</div>
		<p class="dark:text-white text-sm text-left font-medium">
			{creatingAccount ? "already have an account?" : "don\'t have an account?"}
			<button type='button' class="text-blue-500 hover:underline hover:text-blue-700" on:click={() => {
				changeType();
			}}>{creatingAccount ? "sign in" : "create one"}</button>
		</p>
	</form>
</div>
