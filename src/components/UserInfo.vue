<template>
  <div>
    <template v-if="user">
      <div class="p-4">
        <div class="flex items-center">
          <router-link :to="`/profile`">
            <!-- <img class="w-10 h-10 rounded-full mr-4" :src="user.photo" /> -->
            <span class="inline-block w-10 h-10 rounded-full overflow-hidden bg-gray-100">
              <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          </router-link>
          <div class="flex-auto ml-2">
            <div class="text-gray-900 text-sm leading-none">
              <router-link :to="`/profile`">{{ user.fullname }}</router-link>
            </div>
            <div class="text-gray-600 text-xs">{{ user.jabatan }}</div>
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
