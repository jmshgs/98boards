// api/cleanup.js

import { pullUsername, getTimeMade, pushDelUsername } from '$lib/supabaseClient.js';

export default async function handler(req, res) {
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
                    console.log(`API Deleted username: ${user.username}`);
                }
            } catch (error) {
                console.error(`Error processing username ${user.username}:`, error);
            }
        }

        // Refresh the list after deletion
        await fetchUsernames();
    }

    await deleteOldUsernames();
    res.status(200).json({ message: 'Usernames cleanup completed.' });
}
