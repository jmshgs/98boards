<script>
	import { supabase, newsimpleus, fetchsimpleus} from '$lib/supabaseClient.js'

	export let themesCSS;
    export let oldUI = false;
	export let username = "";

	let inputUsername = "";
    let inputPassword = "";
    let clicked = false;

    let wrongPassword = false;
    let foundUser = false;
    let invalidUser = false;
    let userCreated = false;

    function toggleClick(){
        clicked = !clicked;
    }

	function changeUsername(){ 
		username = inputUsername; 
	}

    async function signup() {
        let user = {
            username: inputUsername,
            password: inputPassword,
            role: "User"
        };

        newsimpleus(user).then (() => {
            console.log(`user ${inputUsername} created`)
            userCreated = true;
            foundUser = false;
            invalidUser = false;
            wrongPassword = false;
            username = inputUsername
        })
    }

    async function login() {
        let allusers = []
        fetchsimpleus().then(data => {
            console.log(data)
            allusers = data
            for (let user of allusers){
                if (user.simpleun == inputUsername && user.simpleup == inputPassword){
                    console.log('user found')
                    username = inputUsername
                    foundUser = true;
                    invalidUser = false;
                    wrongPassword = false;
                    userCreated = false;
                    break;
                }else if(user.simpleun == inputUsername && user.simpleup != inputPassword){
                    console.log('wrong password')
                    foundUser = false
                    invalidUser = false
                    wrongPassword = true
                    userCreated = false
                }                
                else{
                    console.log('user not found')
                    foundUser = false
                    invalidUser = true
                    wrongPassword = false
                    userCreated = false
                }
            }
        })
    }

    $: isClicked = clicked ? "Already Have An account?" : "Sign up for an account";
    $: menu = clicked ? "sign up": "log in"
    $: newModalClass = `${oldUI ? "" : "rounded-3xl border-gray-400 border-2 shadow-md"} ${themesCSS}`;
</script>

<div class="w-[32rem] p-4 sm:p-6 md:p-8 text-left {newModalClass}">
	<h5 class="text-3xl font-bold {themesCSS}">{menu}</h5>
    <form class="space-y w-[25rem]">
        <div class="overflow-y-auto overflow-x-scroll py-4 space-x-4 flex items-center justify-between {themesCSS}">
            <input on:keypress={
                (e) => {
                    if (e.key === "Enter") {
                        changeUsername()
                    }
                } 
                } type="text" class="border-gray-300 {themesCSS} rounded-xl w-[60vw] p-2.5 m-1 focus:outline-none" placeholder="enter username" bind:value={inputUsername}>
            <input type="text" class="border-gray-300 bg-black text-green-400 w-20 rounded-xl p-2.5 m-1 focus:outline-none" value={username} readonly>
        </div>			
        <div class="overflow-y-auto overflow-x-scroll py-4 space-x-4 flex items-center justify-between {themesCSS}">
            <input type="password" class="border-gray-300 {themesCSS} rounded-xl w-[60vw] p-2.5 m-1 focus:outline-none" placeholder="enter password" bind:value={inputPassword}>
        </div>
    </form>
    <button class= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => {
        if (menu === "sign up"){
            signup()
        }
        else{
            login()
        }
    }}>{menu}</button>
    <div class="space-y-2">
        {#if foundUser}
            <p class="mx-auto text-green-500">Welcome back, {username}</p>
        {/if}
        {#if invalidUser}
            <p class="mx-auto text-red-500">User not found</p>
        {/if}
        {#if wrongPassword}
            <p class="mx-auto text-yellow-500">Wrong password</p>
        {/if}
        {#if userCreated}
            <p class="mx-auto text-green-500">User {username} created</p>
        {/if}
    </div>
    <p class="text-center mx-auto text-blue-500"><a href="#user" on:click={toggleClick}>{isClicked}</a></p>
</div>