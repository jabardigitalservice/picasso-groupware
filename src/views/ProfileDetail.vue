<template>
  <div class="messages">
    <div class="container max-w-5xl mx-auto">
      <template v-if="user">
        <div class="flex flex-wrap justify-center m-0 mt-24 lg:mt-32">
          <UserProfilePicture
            class="absolute transform -translate-y-16"
            :size="128" />
          <br>
          <div class="bg-white flex-none w-full text-center p-6 pt-20 sm:rounded shadow">
            <p class="text-lg font-semibold">
              {{ user.fullname }}
            </p>
            <p v-if="user.jabatan" class="text-gray-600">
              {{ user.jabatan }}
            </p>
          </div>
          <div class="w-full p-2">
            <AttendanceCardUser />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="bg-white shadow p-4">
          <content-loader
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="15" rx="0" ry="0" width="100%" height="15" />
            <rect x="0" y="45" rx="0" ry="0" width="100%" height="75" />
          </content-loader>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import { ASSETS } from '@/lib/constants'
import { formatDateTimeShort, formatDateLong } from '@/lib/date'
import AttendanceCardUser from '@/components/Dashboard/AttendanceCardUser'
import UserProfilePicture from '../components/Profile/UserProfilePicture.vue'

export default {
  middleware: 'check-auth',

  components: {
    ContentLoader,
    AttendanceCardUser,
    UserProfilePicture
  },

  metaInfo: {
    title: 'My Profile'
  },

  data () {
    return {
      AVATAR_PLACEHOLDER: ASSETS.AVATAR_PLACEHOLDER
    }
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  methods: {
    formatDateTimeShort,
    formatDateLong
  }
}
</script>
