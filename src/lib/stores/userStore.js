import { writable } from 'svelte/store';

// Create a writable store with a default value
const userStore = writable('anon');

export default userStore