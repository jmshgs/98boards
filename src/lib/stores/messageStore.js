import { writable } from "svelte/store";

const messageStore = writable([
    {
        content: '',
        board: 'general',
        sent_at: new Date(),
    }
]);

export default messageStore;