import { writable } from "svelte/store";

const messageStore = writable([
    {
        content: '',
        board: '',
        sent_at: 0
    }
]);

export default messageStore;