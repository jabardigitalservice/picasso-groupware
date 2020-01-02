<template>
  <div class="events-list">
    <template v-if="!loading">
      <div class="flex flex-wrap">
        <div v-for="item in items" :key="item.id" class="w-full bg-white shadow p-4 px-6">
          <div class="flex">
<!--            <div class="flex items-center block mx-auto mr-4">-->
<!--              <i class="far fa-calendar text-brand-green text-lg" />-->
<!--            </div>-->
            <div class="text-left flex-grow">
              <p class="text-sm leading-normal">{{ item['title'] }}</p>
              <p class="text-sm text-gray-600">{{ getDateTime(item) }}</p>
              <p class="text-sm text-gray-600 mt-1"><i class="fas fa-map-marker-alt text-red-500 mr-1" /> Bandung</p>
            </div>
          </div>
        </div>
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
import { formatDateShort, formatDateTimeShort } from '@/lib/date'

export default {
  components: {
    ContentLoader
  },

  computed: mapGetters({
    loading: 'events-list/loading',
    items: 'events-list/items'
  }),

  methods: {
    getDateTime (item) {
      const value = item['start_datetime'].toDate()

      if (item['full_day']) {
        return formatDateShort(value)
      }

      return formatDateTimeShort(value)
    }
  }
}
</script>
