<template>
  <div>
    <template v-if="user">
      <div class="p-4">
        <div class="flex items-center">
          <router-link :to="`/profile`">
            <img
              alt="User Avatar"
              class="w-10 h-10 rounded-full mr-4"
              :src="user.photo || AVATAR_PLACEHOLDER">
          </router-link>
          <div class="flex-auto">
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
import { ASSETS } from '@/lib/constants'
import { UNAUTHENTICATED } from '../store/mutation-types'
import { mapMutations, mapGetters } from 'vuex'

export default {
  data () {
    return {
      AVATAR_PLACEHOLDER: ASSETS.AVATAR_PLACEHOLDER
    }
  },
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
