<template>
  <div>
    <template v-if="user">
      <div class="p-4">
        <div class="flex items-center">
          <router-link :to="`/profile`">
            <img class="w-10 h-10 rounded-full mr-4" :src="user.photo" />
          </router-link>
          <div class="flex-auto text-sm">
            <p class="text-gray-900 leading-none">
              <router-link :to="`/profile`">{{ user.fullname }}</router-link>
            </p>
            <p class="text-gray-600">{{ user.job_title }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { UNAUTHENTICATED } from '../store/mutation-types'
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    // authLoading: 'auth/loading'
    user: 'auth/user'
  }),
  methods: {
    ...mapMutations('auth', [
      UNAUTHENTICATED
    ]),
    async signOut () {
      try {
        await this.$store.dispatch('auth/logout')
      } catch (e) {
        //
      } finally {
        this[UNAUTHENTICATED]()
      }
    }
  }
}
</script>
