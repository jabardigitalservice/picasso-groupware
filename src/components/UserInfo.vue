<template>
  <div>
    <template v-if="user">
      <div>
        <router-link
          to="/profile"
          class="flex flex-row justify-start items-center"
          tag="a">
          <img
            alt="User Avatar"
            class="object-cover object-center w-16 h-16 rounded-full mr-4"
            :src="user.photo || AVATAR_PLACEHOLDER">
          <div class="inline-block flex-auto">
            <strong class="block text-gray-900 text-lg leading-normal">{{ user.fullname }}</strong>
            <p class="text-gray-600 text-sm">{{ user.jabatan }}</p>
          </div>
        </router-link>
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
