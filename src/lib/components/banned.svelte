<script>
    import { onMount } from 'svelte';
  
    let banned_IPS = [];
    let iP = '';
  
    const getBannedUserIPAddresses = async () => {
      try {
        const response = await fetch('/getBannedIPs'); // Example endpoint, replace with your actual API endpoint
        banned_IPS = await response.json();
      } catch (error) {
        console.error('Error fetching banned IPs:', error);
      }
    };
  
    onMount(async () => {
      await getBannedUserIPAddresses();
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        iP = data.ip;
        if (banned_IPS.includes(iP)) {
          alert("You are banned from this site");
          window.location.href = "https://www.google.com";
        }
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    });
  </script>
  
  <svelte:head>
    <title>98boards</title>
  </svelte:head>
  
  <main>
    <div class="min-h-screen bg-black flex justify-center items-center">
      <div class="p-8 bg-red-600 rounded-lg shadow-lg">
        <h1 class="text-white text-3xl font-semibold mb-4">You are banned!</h1>
        <p class="text-white">You are not allowed to access this site.</p>
      </div>
    </div>
  </main>
  
  <style>
    /* You can customize further here */
  </style>
  