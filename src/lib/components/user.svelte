<script>
    import { pullUsername, pushUsername } from '$lib/supabaseClient.js';

    export let username = '';
    export let showUsername;
    let isSubmitted = false;
    let failSubmit = false;
    let isExist = false;

    let listUsername = [];

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
        event.preventDefault(); // Prevent default form submission
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
                const time_made = new Date().toISOString(); // Get the current timestamp

                try {
                    await pushUsername(username, time_made);
                    isSubmitted = true;
                    isExist = false;
                    failSubmit = false;

                    await waitForSeconds(1.0);

                    showUsername = false;
                } catch (error) {
                    console.error('Error inserting username:', error);
                }
            }
        }
    }

    function closeComponent() {
        showUsername = false;
    }
</script>

<div class="relative w-[30rem] p-6 sm:p-8 md:p-10 bg-white shadow-xl rounded-2xl">
    <button on:click={closeComponent} aria-label="Close" class="absolute top-4 right-4 text-red-500 hover:text-red-700 focus:outline-none">
        &#10005;
    </button>
    <h5 class="text-2xl font-semibold text-gray-900 mb-4">Enter Username</h5>
    <form on:submit={handleSubmit} class="space-y-6">
        <div class="flex items-center">
            <input
                type="text"
                bind:value={username}
                placeholder="Enter your username"
                class="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                aria-label="Username"
            />
        </div>
        {#if isSubmitted}
        <div class="text-green-600 font-medium">Username entered successfully!</div>
        {/if}
        {#if failSubmit}
        <div class="text-red-500 font-medium">Username cannot be empty.</div>
        {/if}
        {#if isExist}
        <div class="text-yellow-500 font-medium">Username already exists.</div>
        {/if}
        <button type="submit" class="w-full py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
    </form>
</div>
