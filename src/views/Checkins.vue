<template>
  <div class="checkins">
    <div class="container mx-auto">
      <template v-if="!user">
        <div class="w-full pt-4">
          <div class="text-center">
            <i class="far fa-4x fa-check-circle mb-4 text-gray-600" />
            <p class="text-sm">Silahkan login untuk melakukan checkin.</p>
          </div>

          <div class="mx-2 my-2">
            <login-button />
          </div>
        </div>
      </template>
      <template v-else>
        <div>
          <div class="w-full p-2">
            <router-link to="/checkins/create" class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded">Checkin</router-link>
          </div>

          <checkins-list class="mt-2" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { analytics } from '@/lib/firebase'
import LoginButton from '@/components/LoginButton'
import CheckinsList from '@/components/CheckinsList'

export default {
  components: {
    LoginButton,
    CheckinsList
  },

  metaInfo: {
    title: 'Checkins'
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  mounted () {
    this.fetchItems()

    analytics.logEvent('checkins_list_view')
  },

  methods: {
    async fetchItems () {
      await this.$store.dispatch('checkins-list/fetchItems')
    }
  }
}
</script>
