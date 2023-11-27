<script>
    import { createUser } from '$lib/supabaseClient.js';  
    import { createEventDispatcher } from 'svelte';
    import userStore from "$lib/stores/userStore.js";

    let email = '';
    let passwords = '';
  
    const dispatch = createEventDispatcher();

    async function signup() {
        try {
            let user = {
                email: email,
                password: passwords
            };

            const response = await createUser(user);

            if (response && response.user) {
                showAlertModal('Account created successfully!');
                userStore.set(email)
            } else {
                showAlertModal('Error creating account!');
            }
        } catch (error) {
            console.error("Signup error:", error.message);
            showAlertModal('Error creating account!');
        }
    }
    function close(){
        dispatch('close');
    }
    function showAlertModal(text) {
        document.getElementById('modal-content').textContent = text;
        document.getElementById('alertModal').classList.remove('hidden');
    }

    function closeAlertModal() {
        document.getElementById('alertModal').classList.add('hidden');
        close()
    }
  </script>
  <div id="alertModal" class="fixed z-10 inset-0 overflow-y-auto hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Alert
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500" id="modal-content">
                  <!-- Content will be inserted here -->
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" on:click={closeAlertModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
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
            <label for="email" class="sr-only">Email</label>
            <input id="email" name="email" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email Address" bind:value={email}>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" bind:value={passwords}>
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