<script>
    export let username = '';
    export let showUsername;
    let isSubmitted = false;
    let failSubmit = false;

    function waitForSeconds(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission
        if (username.trim() === '') {
            failSubmit=true;
            isSubmitted=false;
        }
        else{
            isSubmitted = true;
            failSubmit = false;

            waitForSeconds(1.5);

            showUsername=false;
        }
    }
</script>

<div class="w-[30rem] p-4 sm:p-6 md:p-8 text-left bg-white shadow-lg rounded-lg">
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
        <div class="mt-4 text-red-400">Username cannot be empty. </div>
        {/if}
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" on:click={handleSubmit}>Submit</button>
    </form>
</div>
