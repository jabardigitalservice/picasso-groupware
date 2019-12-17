<template>
  <div class="home-banner-list">
    <template v-if="!loading">
      <div v-for="item in items" :key="item.id" class="bg-white shadow m-2 p-4">
        <div>{{ item['title'] }}</div>
        <div>{{ formatPublishedDate(item['published_at']) }}</div>
      </div>
    </template>
    <template v-else>
      <content-loader :height="220" :width="640" :speed="2">
        <rect x="0" y="0" rx="0" ry="0" width="640" height="220" />
      </content-loader>
    </template>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapGetters } from 'vuex'

export default {
  components: {
    ContentLoader
  },

  computed: mapGetters({
    loading: 'home-articles/loading',
    items: 'home-articles/items'
  }),

  methods: {
    formatPublishedDate (timestamp) {
      const date = timestamp.toDate()

      return date.toDateString()
    }
  }
}
</script>
