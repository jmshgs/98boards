import { writable } from "svelte/store";

const messageStore = writable([
    {
        content: '',
        board: '',
        sender: '',
        sent_at: 0
    }
]);

export default messageStore;