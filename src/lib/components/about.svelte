<script>
  import { onMount } from 'svelte';
  
  let activeTab = 'AboutUS';
  let USINFO = 'Two bored teenagers with a passion for coding';
  let BoardsInfo = 'a website to chat instantly with people without creating an account';
  let ChangeLog = 'https://98boards.vercel.app/log';
  let showDropdown = false; // State to manage the dropdown visibility
  
  // Function to switch tabs
  function switchTab(tab) {
    activeTab = tab;
  }

  // Function to toggle the dropdown
  function dropdownProfile() {
    showDropdown = !showDropdown;
  }

  onMount(() => {
    // Default tab selection
    switchTab(activeTab);
  });
</script>

<div class="max-w-2xl mx-auto p-4">
  <div class="flex justify-center space-x-2">
    <button class="py-2 px-4 rounded-full bg-gray-800 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300" on:click={() => switchTab('AboutUS')}>About US</button>
    <button class="py-2 px-4 rounded-full bg-gray-800 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300" on:click={() => switchTab('98')}>About 98Boards</button>
    <button class="py-2 px-4 rounded-full bg-gray-800 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300" on:click={() => switchTab('Changelog')}>Changelog</button>
  </div>

  <div class="mt-6 relative">
    {#if activeTab === 'AboutUS'}
      <div class="p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200 cursor-pointer" on:click={dropdownProfile}>{USINFO}</div>
      {#if showDropdown}
        <div class="absolute top-full mt-2 w-full flex justify-center space-x-4">
          <!-- First GitHub link box -->
          <div class="p-4 bg-gray-950 text-white rounded-xl shadow-sm border border-gray-200">
            <a class="block text-white hover:underline" href="https://github.com/jxhug" target="_blank">jxhug</a>
          </div>
          <!-- Second GitHub link box -->
          <div class="p-4 bg-gray-950 text-white rounded-xl shadow-sm border border-gray-200">
            <a class="block text-white hover:underline" href="https://github.com/ionppng" target="_blank">ionpng</a>
          </div>
        </div>
      {/if}
    {/if}
    {#if activeTab === '98'}
      <div class="p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200"><a href="/">{BoardsInfo}</a></div>
    {/if}
    {#if activeTab === 'Changelog'}
      <div class="p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200"><a class="text-gray-800 hover:underline" href={ChangeLog}>98boards.vercel.app/log</a></div>
    {/if}
  </div>
</div>

<style>
  .shadow-md {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .transition-all {
      transition: all 0.3s ease-in-out;
  }
</style>
