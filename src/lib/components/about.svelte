<script>
  import { onMount } from 'svelte';
  import { InfoIcon, UserIcon, ClipboardIcon, GithubIcon } from 'svelte-feather-icons';

  let activeTab = 'AboutUS';
  let USINFO = 'We are a team of passionate developers creating innovative solutions.';
  let BoardsInfo = 'A website to chat instantly with people without creating an account';
  let ChangeLog = '/log';
  let showDropdown = false; 

  function switchTab(tab) {
    activeTab = tab;
    console.log(activeTab)
    showDropdown = false; 
  }

</script>

<div class="flex max-w-2xl mx-auto p-4">
  <!-- Sidebar with Icons -->
  <div class="flex flex-col items-center space-y-4 p-4 bg-gray-50 rounded-l-xl shadow-md">
    <button on:click={() => switchTab('AboutUS')}>    <UserIcon class="cursor-pointer text-gray-800 w-8 h-8 hover:text-gray-500" /></button> 
    <button on:click={() => switchTab('98')}>    <InfoIcon class="cursor-pointer text-gray-800 w-8 h-8 hover:text-gray-500" /> </button>
    <button on:click={() => switchTab('Changelog')}> <ClipboardIcon class="cursor-pointer text-gray-800 w-8 h-8 hover:text-gray-500" /> </button>
  </div>

  <!-- Main Content Section -->
  <div class="flex-1 p-4 bg-gray-50 rounded-r-xl shadow-md">
    {#if activeTab === 'AboutUS'}
      <div class="relative">
        <div class="text-lg font-semibold text-gray-800 cursor-pointer">{USINFO}</div>
        <div class="absolute top-full mt-2 w-full flex justify-center space-x-4">
          <a href="https://github.com/jxhug" target="_blank">
            
            <GithubIcon class="cursor-pointer text-gray-800 w-8 h-8 hover:text-gray-500" />
            jxhug
          </a>
          <a href="https://github.com/ionppng" target="_blank">
            
            <GithubIcon class="cursor-pointer text-gray-800 w-8 h-8 hover:text-gray-500" />
            ionpng
          </a>
      </div>
    </div>
    {/if}
    {#if activeTab === '98'}
      <div>
        <div class="text-lg font-semibold text-gray-800 mb-2">What is 98Boards?</div>
        <p class="text-gray-600">{BoardsInfo}</p>
        <p class="text-gray-600 mt-2">Join discussions, share ideas, and make connections effortlessly.</p>
      </div>
    {/if}
    {#if activeTab === 'Changelog'}
      <div>
        <div class="text-lg font-semibold text-gray-800 mb-2">Changelog</div>
        <p class="text-gray-600">Stay updated with the latest features and bug fixes.</p>
        <a class="text-blue-600 hover:underline" href={ChangeLog} target="_self">View the full changelog</a>
      </div>
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
