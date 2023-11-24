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
  
  ok
  i'll add a form hold on