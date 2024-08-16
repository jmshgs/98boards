<script>
    import { pullUsername, pushUsername } from '$lib/supabaseClient.js';
    import { persisted } from 'svelte-persisted-store';

    export let persistedUsernameStore = persisted('username', { key: 'username' });

    export let showUsername;
    let isSubmitted = false;
    let failSubmit = false;
    let isExist = false;

    let listUsername = [];
    let username = ''; 

    async function fetchUsernames() {
        try {
            listUsername = await pullUsername();
        } catch (error) {
            console.error('Error fetching usernames:', error);
        }
    }

    fetchUsernames().then(
        data => console.log(data)
    ).catch(
        error => console.error('Error:', error)
    );

    function waitForSeconds(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    async function handleSubmit(event) {
        event.preventDefault(); 
        if (username.trim() === '') {
            failSubmit = true;
            isSubmitted = false;
            isExist = false;
        } else {
            const usernameExists = listUsername.some(user => user.username === username);
            if (usernameExists) {
                isSubmitted = false;
                isExist = true;
                failSubmit = false;
            } else {
                const time_made = new Date().toISOString(); 

                try {
                    await pushUsername(username, time_made);
                    isSubmitted = true;
                    isExist = false;
                    failSubmit = false;

                    // Store the username in the persisted store
                    persistedUsernameStore.set(username);

                    await waitForSeconds(1.0);

                    showUsername = false;
                } catch (error) {
                    console.error('Error inserting username:', error);
                }
            }
        }
    }
</script>

<div class="w-[30rem] p-4 sm:p-6 md:p-8 text-left bg-white rounded-lg">
    <h5 class="text-3xl font-bold text-gray-800 mb-4">Enter Username</h5>
    <form on:submit={handleSubmit} class="space-y-4 w-[25rem]">
        <div class="flex items-center space-x-4">
            <input
                type="text"
                bind:value={username}
                placeholder="Enter your username"
                class="border-2 border-gray-300 rounded-xl w-full p-3 focus:outline-none focus:border-blue-500 placeholder-gray-500"
                aria-label="Username"
            />
        </div>
        {#if isSubmitted}
            <div class="mt-4 text-green-500">Username entered successfully!</div>
        {/if}
        {#if failSubmit}
            <div class="mt-4 text-red-400">Username cannot be empty.</div>
        {/if}
        {#if isExist}
            <div class="mt-4 text-yellow-400">Username already exists.</div>
        {/if}
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl mt-6">Submit</button>
    </form>
</div>
