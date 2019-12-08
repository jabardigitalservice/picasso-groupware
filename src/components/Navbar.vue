<template>
  <div class="w-full bg-white p-1 shadow" style="position: fixed; bottom: 0">
    <div class="container mx-auto px-4">
      <div class="flex items-center w-full lg:max-w-sm lg:mx-auto justify-around flex-wrap">
        <div class="text-center px-4 py-1">
          <router-link class="no-underline text-gray-700 block" to="/">
            <i class="fas fa-home text-lg mb-2"></i>
            <p class="text-xs">Home</p>
          </router-link>
        </div>
        <div class="text-center px-4 py-1">
          <router-link class="no-underline text-gray-700 block" to="/notifications">
            <i class="far fa-bell text-lg mb-2 notification-dot relative"></i>
            <p class="text-xs">Notifications</p>
          </router-link>
        </div>
        <div class="text-center px-4 py-1">
          <router-link class="no-underline text-gray-700 block" to="/about">
            <i class="far fa-user text-lg mb-2"></i>
            <p class="text-xs">Profile</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //
}
</script>
