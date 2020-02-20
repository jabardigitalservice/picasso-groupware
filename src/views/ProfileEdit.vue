<template>
  <div class="messages">
    <div class="container mx-auto">
      <template v-if="user && !loading">
        <template v-if="!error">
          <div class="bg-white m-0 sm:rounded shadow">
            <div class="border-b">
              <div class="w-full px-4 py-4 mt-4">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="input-job_title">
                  Job Title
                </label>
                <input v-model="job_title" type="text" id="input-job_title" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>

                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="input-phone">
                  Phone
                </label>
                <input v-model="phone" type="text" id="input-phone" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
              </div>
            </div>
            <div class="border-b">
              <div class="px-4 py-4 text-center">
                <button class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded" type="button">
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="bg-red-100 border border-red-400 text-red-700 mx-2 sm:mx-0 px-4 py-3 relative" role="alert">
            <strong class="font-bold">Holy smokes! </strong>
            <span class="block sm:inline">Something seriously bad happened.</span>
          </div>
        </template>
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
import { formatDateTimeShort, formatDateLong } from '@/lib/date'
// import { analytics } from '@/lib/firebase'

export default {
  middleware: 'auth',

  components: {
    ContentLoader
  },

  metaInfo: {
    title: 'My Profile'
  },

  data () {
    return {
      job_title: null,
      phone: null
    }
  },

  computed: mapGetters({
    user: 'auth/user',
    loading: 'profile-detail/loading',
    item: 'profile-detail/item',
    error: 'profile-detail/error'
  }),

  mounted () {
    this.fetchItem()
  },

  watch: {
    item (newValue) {
      this.job_title = newValue['job_title']
      this.phone = newValue['phone']
    }
  },

  methods: {
    formatDateTimeShort,
    formatDateLong,

    async fetchItem () {
      await this.$store.dispatch('profile-detail/fetchItem')
    }
  }
}
</script>
