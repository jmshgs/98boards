<script>
    import { onMount } from 'svelte';
    
    let activeTab = 'AboutUS';
    let USINFO = 'Two bored teenagers with a passion for coding';
    let BoardsInfo = 'a website to chat instantly with people without creating an account';
    let ChangeLog = 'https://98boards.vercel.app/log';
    // Function to switch tabs
    function switchTab(tab) {
      activeTab = tab;
    }
  
    onMount(() => {
      // Default tab selection
      switchTab(activeTab);
    });
</script>
  
<div class="max-w-2xl mx-auto">
    <div class="flex justify-center space-x-4">
      <button class="py-2 px-4 rounded-lg bg-blue-500 text-white focus:outline-none focus:bg-blue-600" on:click={() => switchTab('AboutUS')}>About US</button>
      <button class="py-2 px-4 rounded-lg bg-blue-500 text-white focus:outline-none focus:bg-blue-600" on:click={() => switchTab('98')}>About 98Boards</button>
      <button class="py-2 px-4 rounded-lg bg-blue-500 text-white focus:outline-none focus:bg-blue-600" on:click={() => switchTab('Changelog')}>Changelog</button>
    </div>
  
    <div class="mt-4">
      {#if activeTab === 'AboutUS'}
        <div class="p-4 bg-gray-100 rounded-lg">{USINFO}</div>
      {/if}
      {#if activeTab === '98'}
        <div class="p-4 bg-gray-100 rounded-lg">{BoardsInfo}</div>
      {/if}
      {#if activeTab === 'Changelog'}
        <div class="p-4 bg-gray-100 rounded-lg"><a href={ChangeLog}>98boards.vercel.app/log</a></div>
      {/if}

    </div>
</div>
