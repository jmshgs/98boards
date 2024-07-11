<script>
    import { pullUsername, getTimeMade, pushDelUsername } from '$lib/supabaseClient.js';

    let listUsername = [];
    let currentTime = new Date();

    async function fetchUsernames() {
        try {
            listUsername = await pullUsername();
        } catch (error) {
            console.error('Error fetching usernames:', error);
        }
    }

    function isOlderThan30Minutes(time) {
        const usernameTime = new Date(time);
        const timeDifference = (currentTime - usernameTime) / (1000 * 60); // Difference in minutes
        return timeDifference > 30;
    }

    async function deleteOldUsernames() {
        await fetchUsernames();

        for (let user of listUsername) {
            try {
                const timeMade = await getTimeMade(user.username);
                if (isOlderThan30Minutes(timeMade)) {
                    await pushDelUsername(user.username);
                    console.log(`Deleted username: ${user.username}`);
                }
            } catch (error) {
                console.error(`Error processing username ${user.username}:`, error);
            }
        }

        // Refresh the list after deletion
        await fetchUsernames();
    }

    // Call deleteOldUsernames function on component mount and every minute
    deleteOldUsernames();
    const interval = setInterval(deleteOldUsernames, 60000);

    // Clear the interval when the component is destroyed to prevent memory leaks
    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h5 class="text-3xl font-bold text-gray-800 mb-4">Usernames Cleanup</h5>
    <p class="text-gray-600 mb-6">Checking for and deleting usernames older than 30 minutes...</p>
    <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead class="bg-gray-100">
                <tr>
                    <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                {#each listUsername as user}
                    <tr>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900">{user.username}</td>
                        <td class="py-4 px-6 text-sm text-gray-500">{new Date(user.time_made).toLocaleString()}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
