<template>
  <div class="home-banner-list">
    <template v-if="!loading">
      <div class="flex flex-wrap">
        <div v-for="item in items" :key="item.id" class="w-full bg-white rounded-lg shadow mx-2 mb-2 p-4">
          <router-link :to="`/articles/${item.id}`">
            <div class="flex">
              <div class="flex items-center block mx-auto mr-4">
                <i class="fas fa-check-circle text-brand-green text-lg" />
              </div>
              <div class="text-left flex-grow">
                <p class="text-sm leading-normal">{{ item['title'] }}</p>
                <p class="text-sm text-gray-600">{{ formatDateTimeShort(item['published_at'].toDate()) }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-for="n in 5" :key="n" class="bg-white rounded-lg shadow m-2 p-4">
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
import { formatDateTimeShort } from '@/lib/date'

export default {
  components: {
    ContentLoader
  },

  computed: mapGetters({
    loading: 'home-articles/loading',
    items: 'home-articles/items'
  }),

  methods: {
    formatDateTimeShort
  }
}
</script>
