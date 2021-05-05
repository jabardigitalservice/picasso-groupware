<template>
  <div>
    <template v-if="user">
      <div>
        <router-link
          to="/profile"
          class="flex flex-row justify-start items-center"
          tag="a">
          <UserProfilePicture class="flex-none mr-4" />
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
import { UNAUTHENTICATED } from '../store/mutation-types'
import { mapMutations, mapGetters } from 'vuex'
import UserProfilePicture from './Profile/UserProfilePicture.vue'

export default {
  components: {
    UserProfilePicture
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
