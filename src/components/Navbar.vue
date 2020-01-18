<template>
  <div class="w-full bg-white p-1 shadow" style="position: fixed; bottom: 0">
    <div class="container mx-auto px-4">
      <div class="flex items-center w-full lg:max-w-sm lg:mx-auto justify-around flex-wrap">
        <div class="text-center px-2 py-1">
          <router-link class="no-underline text-gray-700 block" to="/">
            <i class="fas fa-home text-lg" />
            <p class="text-xs">Home</p>
          </router-link>
        </div>
        <div v-if="user" class="text-center px-2 py-1">
          <router-link class="no-underline text-gray-700 block" to="/messages">
            <i class="far fa-bell text-lg" />
            <p class="text-xs">Messages</p>
          </router-link>
        </div>
        <div v-if="user" class="text-center px-2 py-1">
          <router-link class="no-underline text-gray-700 block" to="/events">
            <i class="far fa-calendar text-lg" />
            <p class="text-xs">Events</p>
          </router-link>
        </div>
        <div v-if="user" class="text-center px-2 py-1">
          <router-link class="no-underline text-gray-700 block" to="/thankyou">
            <i class="far fa-heart text-lg" />
            <p class="text-xs">Thank You</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    // authLoading: 'auth/loading'
    user: 'auth/user'
  })
}
</script>
