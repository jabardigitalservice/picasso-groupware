<template>
  <div class="events-list">
    <template v-if="!loading">
      <div class="flex flex-wrap">
        <div v-for="item in items" :key="item.id" class="w-full bg-white shadow p-4 px-6">
          <div class="flex">
            <div class="text-left flex-grow">
              <p class="text-sm leading-normal">{{ item['title'] }}</p>
            </div>
            <div class="flex items-center block mx-auto mr-4">
              <span class="text-sm mr-2">{{ item['votes_count'] }}</span> <span @click="vote(item.id)"><i class="fas fa-heart text-red-500" /></span>
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
import { formatDateTimeShort } from '@/lib/date'

export default {
  components: {
    ContentLoader
  },

  computed: mapGetters({
    loading: 'feedback-list/loading',
    items: 'feedback-list/items'
  }),

  methods: {
    formatDateTimeShort,

    async vote (id) {
      await this.$store.dispatch('feedback-list/vote', { id: id })
    }
  }
}
</script>
