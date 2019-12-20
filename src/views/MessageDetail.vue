<template>
  <div class="messages">
    <div class="container mx-auto">
      <div class="bg-white rounded-lg shadow m-2 p-4">
        <template v-if="!loading">
          <p class="text-sm leading-normal">{{ item['title'] }}</p>
          <p class="text-sm text-gray-600">{{ formatDateTimeShort(item['published_at'].toDate()) }}</p>

          <div class="text-sm leading-normal mt-5">{{ item['content'] }}</div>
        </template>

        <template v-else>
          <content-loader
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="15" rx="0" ry="0" width="100%" height="15" />
            <rect x="0" y="45" rx="0" ry="0" width="100%" height="75" />
          </content-loader>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import { formatDateTimeShort } from '@/lib/date'

export default {
  components: {
    ContentLoader
  },

  metaInfo: {
    title: 'Message Detail'
  },

  computed: mapGetters({
    loading: 'messages-detail/loading',
    item: 'messages-detail/item'
  }),

  mounted () {
    this.fetchItem(this.$route.params.id)
  },

  methods: {
    formatDateTimeShort,

    async fetchItem (id) {
      await this.$store.dispatch('messages-detail/fetchItem', { id: id })
    }
  }
}
</script>
