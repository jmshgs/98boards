<script>
    import { onMount } from 'svelte';
    let email = '';
    let password = '';
    let username = '';
    function handleSignup() {
      // Handle login logic here
      console.log(`Email: ${email}, Password: ${password}`);
    }
  
    onMount(() => {
      import('tailwindcss/tailwind.css');
    });
  </script>
  
  <main class="flex items-center justify-center h-screen bg-gray-200">
    <div class="p-8 bg-white rounded shadow-md w-80">
      <h2 class="text-2xl font-bold mb-8 text-gray-700">Signup</h2>
      <form on:submit|preventDefault={handleSignup} class="space-y-5">
        <div>
            <label for="username" class="block mb-2 text-sm text-gray-600">Username</label>
            <input type="username" bind:value={username} id='username' required class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
        </div>
        <div>
          <label for="email" class="block mb-2 text-sm text-gray-600">Email</label>
          <input type="email" bind:value={email} id="email" required class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
        </div>
  
        <div>
          <label for="password" class="block mb-2 text-sm text-gray-600">Password</label>
          <input type="password" bind:value={password} id="password" required class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
        </div>
  
        <button type="submit" class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Signup</button>
        <p>Already Have An Account? <a href="/login" class="text-blue-700">Login</a></p>
        <p>Back -<a href="/" class="text-blue-700">Home</a></p>
      </form>
    </div>
  </main>