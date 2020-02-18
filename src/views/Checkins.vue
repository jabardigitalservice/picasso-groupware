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
          <div class="w-full px-2 sm:px-0">
            <select v-model="selectedDate" @change="changeDate" class="h-12 w-full appearance-none block text-gray-700 border border-gray-300 bg-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option v-for="date in getListDate()" :key="format(date, 'yyyyMMdd')" :value="format(date, 'yyyyMMdd')">{{ formatDateLong(date) }}</option>
            </select>
          </div>

          <checkins-list class="mt-2" />

          <div class="w-full p-2 sm:px-0">
            <router-link to="/checkins/create" class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded">Checkin</router-link>
          </div>
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
import { formatDateLong } from '@/lib/date'
import { eachDayOfInterval, subDays, format } from 'date-fns'

export default {
  components: {
    LoginButton,
    CheckinsList
  },

  metaInfo: {
    title: 'Checkins'
  },

  data () {
    return {
      selectedDate: format(new Date(), 'yyyyMMdd')
    }
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  mounted () {
    this.fetchItems(format(new Date(), 'yyyyMMdd'))

    analytics.logEvent('checkins_list_view')
  },

  methods: {
    format,
    formatDateLong,

    getListDate () {
      const maxPrevious = subDays(new Date(), 30)

      return eachDayOfInterval({
        start: maxPrevious,
        end: new Date()
      })
    },

    changeDate () {
      this.fetchItems(this.selectedDate)
    },

    async fetchItems (date) {
      await this.$store.dispatch('checkins-list/fetchItems', { date: date })
    }
  }
}
</script>
