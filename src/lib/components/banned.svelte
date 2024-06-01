<script>
  import { getUserInfoByIP } from '$lib/supabaseClient.js'

  export let iP;
  let username = '';
  let reason = ''; 

  async function fetchUserInfo() {
    const userInfo = await getUserInfoByIP(iP);
    if(userInfo){
      username = userInfo.user_id;
      reason = userInfo.reason;
    } else {
      console.log('User info not found for IP address:', ipAddress);
    }
  }

  fetchUserInfo();
</script>

<div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div class="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4 text-red-500">You Have Been Banned!</h2>
        <p class="text-gray-700 mb-8">Your account [{username}] has been temporarily suspended for [{reason}].</p>
        <hr class="my-4 border-t-2 border-gray-200 w-3/4 mx-auto">
        <p class="text-gray-600">Please contact support for further assistance.</p>
    </div>
</div>
