<script>
    import { fetchUsers } from '$lib/supabaseClient.js';  
    import { createEventDispatcher } from 'svelte';

    let email = '';
    let password = '';
  
    const dispatch = createEventDispatcher();

    async function signup() {
      const user = { email, password };
      const response = await fetchUsers(user);
      if (response) {
        // handle successful login
      } else {
        // handle failed login
      }
    }

    function close(){
        dispatch('close');
    }
  </script>
  
  <div class="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <button class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-700 focus:outline-none" on:click={close}>
        X
      </button>    
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up for your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" on:submit|preventDefault={signup}>   
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" bind:value={email}>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" bind:value={password}>
          </div>
        </div>
  
        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>