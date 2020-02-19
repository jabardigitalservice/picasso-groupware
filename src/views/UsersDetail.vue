<template>
  <div class="messages">
    <div class="container mx-auto">
      <template v-if="!loading">
        <template v-if="!error">
          <div class="bg-white m-0 sm:rounded shadow">
            <div class="text-center p-6  border-b">
              <a :href="item['photo']">
                <img class="h-40 w-40 rounded-full mx-auto" :src="item['photo']" :alt="item['name']" />
              </a>

              <p class="pt-4 text-lg font-semibold">
                {{ item['name'] }}
              </p>
              <p class="text-gray-600">
                {{ item['email'] }}
              </p>
            </div>
            <div class="border-b">
              <!-- First list item -->
              <a href="#" class="px-2 py-3 hover:bg-gray-200 flex">
                <div class="pl-3">
                  <p class="font-semibold">
                    Last Online
                  </p>
                  <p class="text-gray-600">
                    {{ formatDateTimeShort(item['last_seen_at'].toDate()) }}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
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
import { formatDateTimeShort } from '@/lib/date'
import { analytics } from '@/lib/firebase'

export default {
  components: {
    ContentLoader
  },

  metaInfo: {
    title: 'User Detail'
  },

  computed: mapGetters({
    user: 'auth/user',
    loading: 'users-detail/loading',
    item: 'users-detail/item',
    error: 'users-detail/error'
  }),

  mounted () {
    this.fetchItem(this.$route.params.id)
  },

  methods: {
    formatDateTimeShort,

    async fetchItem (id) {
      await this.$store.dispatch('users-detail/fetchItem', { id: id })

      analytics.logEvent('users_detail_view', { id: id })
    }
  }
}
</script>
