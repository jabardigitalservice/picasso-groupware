<template>
  <div class="events-list">
    <template v-if="!loading">
      <div class="flex flex-wrap">
        <template v-if="items.length > 0">
          <div v-for="item in items" :key="item.id" class="w-full bg-white shadow p-4 px-6">
            <div class="flex items-center">
              <img class="w-10 h-10 rounded-full mr-4" :src="item['user_photo']" />
              <div class="flex-auto text-sm">
                <p class="text-gray-900 font-bold">{{ item['user_name'] }}</p>
                <p class="text-gray-900">{{ item['message'] }}</p>
                <p class="text-gray-600">{{ formatTime(item['checkin_at'].toDate()) }}</p>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="w-full shadow bg-white mb-2 p-4">
            <div class="text-center">
              <i class="far fa-4x fa-sad-tear mb-4 text-gray-600" />
              <p class="text-sm">Belum ada yang checkin. Kantor sepi.</p>
            </div>
          </div>
        </template>
      </div>
    </template>
    <template v-else>
      <div v-for="n in 5" :key="n" class="bg-white shadow p-4">
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
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapGetters } from 'vuex'
import { formatTime } from '@/lib/date'

export default {
  components: {
    ContentLoader
  },

  computed: mapGetters({
    loading: 'checkins-list/loading',
    items: 'checkins-list/items'
  }),

  methods: {
    formatTime
  }
}
</script>
