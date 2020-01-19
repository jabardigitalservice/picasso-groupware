<template>
  <div>
    <template v-if="user">
      <div class="p-4">
        <div class="flex items-center">
          <img class="w-10 h-10 rounded-full mr-4" :src="user.photo" />
          <div class="flex-auto text-sm">
            <p class="text-gray-900 leading-none">{{ user.name }}</p>
            <p class="text-gray-600">Super Hero</p>
          </div>
          <button type="button" class="text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded" @click="signOut">Logout</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    // authLoading: 'auth/loading'
    user: 'auth/user'
  }),

  methods: {
    signOut () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
