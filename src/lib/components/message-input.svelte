<script>
    export let message = "";
    export let username;
    export let themesCSS;
    export let sendMessage;
</script>

<div class="overflow-y-auto py-4 space-x-4 flex items-center justify-center {themesCSS}">
    <input on:keypress={
        (e) => {
            if (e.key === "Enter") {
                sendMessage(message);
                message = "";
            }
        } 
        } type="text" name="message" id="message" class="border-gray-300 {themesCSS} rounded-xl w-[71.5vw] p-2.5 m-1 focus:outline-none" placeholder="say hello, {username}" bind:value={message}>
</div>