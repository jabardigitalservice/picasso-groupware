<template>
  <div class="messages-list">
    <template v-if="!loading">
      <div v-for="item in items" :key="item.id" class="w-full bg-white border-b p-4">
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
    loading: 'messages-list/loading',
    items: 'messages-list/items'
  }),

  methods: {
    formatPublishedDate (timestamp) {
      const date = timestamp.toDate()

      return date.toDateString()
    }
  }
}
</script>
