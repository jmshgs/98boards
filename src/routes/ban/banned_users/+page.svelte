<script>
  import { onMount } from 'svelte';
  import { getAllBannedUserData, deleteBannedUser } from '$lib/supabaseClient.js'; // Adjust the import path as needed

  let bannedUsers = [];
  let isLoading = true;
  let isDeleting = false;
  let deleteError = '';

  onMount(async () => {
    try {
      bannedUsers = await getAllBannedUserData();
    } catch (error) {
      console.error('Error fetching banned users:', error);
    } finally {
      isLoading = false;
    }
  });

  const handleDelete = async (ip_address) => {
    if (confirm('Are you sure you want to delete this user?')) {
      isDeleting = true;
      deleteError = '';
      try {
        const success = await deleteBannedUser(ip_address);
        if (success) {
          bannedUsers = bannedUsers.filter(user => user.ip_address !== ip_address);
        } else {
          deleteError = 'Failed to delete user. Please try again.';
        }
      } catch (error) {
        deleteError = 'An error occurred. Please try again.';
        console.error('Error deleting user:', error);
      } finally {
        isDeleting = false;
      }
    }
  };
</script>

<div class="container mx-auto mt-10 px-4">
  <div class="bg-white rounded-lg shadow-md overflow-x-auto">
    {#if isLoading}
      <div class="text-center text-gray-600 mt-5">Loading...</div>
    {:else}
      {#if bannedUsers.length === 0}
        <div class="text-center text-gray-600 mt-5">No banned users found.</div>
      {:else}
        <table class="min-w-full table-auto border-collapse">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-3 px-4 text-left text-gray-700 font-semibold">#</th>
              <th class="py-3 px-4 text-left text-gray-700 font-semibold">User ID</th>
              <th class="py-3 px-4 text-left text-gray-700 font-semibold">IP Address</th>
              <th class="py-3 px-4 text-left text-gray-700 font-semibold">Reason</th>
              <th class="py-3 px-4 text-left text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each bannedUsers as user, index}
              <tr class="odd:bg-white even:bg-gray-50">
                <td class="py-3 px-4">{index + 1}</td>
                <td class="py-3 px-4">{user.user_id}</td>
                <td class="py-3 px-4">{user.ip_address}</td>
                <td class="py-3 px-4">{user.reason}</td>
                <td class="py-3 px-4">
                  <button
                    class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
                    on:click={() => handleDelete(user.ip_address)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    {/if}
    {#if deleteError}
      <div class="text-center text-red-500 mt-5">{deleteError}</div>
    {/if}
  </div>
</div>
