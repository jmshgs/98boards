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

<div class="flex flex-col items-center justify-center h-screen">
    <div class="max-w-md mx-auto p-8 bg-white rounded-xl shadow-md"> <!-- Changed from rounded-lg to rounded-xl for more rounded corners -->
        <h2 class="text-xl font-bold mb-4 text-red-500">You Have Been Banned!</h2>
        <p class="text-gray-700 mb-4">Your account [{username}] has been temporarily suspended for [{reason}].</p>
        <p class="text-xl font-bold text-black">L BOZO</p>
    </div>
</div>
