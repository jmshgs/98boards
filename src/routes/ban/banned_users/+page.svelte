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

<style>
  .table-container {
    max-width: 100%;
    overflow-x: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  .th,
  .td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  .th {
    background-color: #f1f5f9;
    font-weight: 600;
  }
  .tr:nth-child(even) {
    background-color: #f9fafb;
  }
  .delete-button {
    background-color: #ef4444;
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  .delete-button:hover {
    background-color: #dc2626;
  }
  .loading,
  .error {
    text-align: center;
    margin-top: 20px;
  }
</style>

<div class="container mx-auto mt-10 px-4">
  <div class="table-container bg-white">
    {#if isLoading}
      <div class="loading">Loading...</div>
    {:else}
      {#if bannedUsers.length === 0}
        <div class="loading">No banned users found.</div>
      {:else}
        <table class="table">
          <thead>
            <tr class="tr">
              <th class="th">#</th>
              <th class="th">User ID</th>
              <th class="th">IP Address</th>
              <th class="th">Reason</th>
              <th class="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each bannedUsers as user, index}
              <tr class="tr">
                <td class="td">{index + 1}</td>
                <td class="td">{user.user_id}</td>
                <td class="td">{user.ip_address}</td>
                <td class="td">{user.reason}</td>
                <td class="td">
                  <button
                    class="delete-button"
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
      <div class="error text-red-500">{deleteError}</div>
    {/if}
  </div>
</div>
