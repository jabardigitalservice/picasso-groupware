<template>
  <div>
    <template v-if="!isLoading">
      <div class="flex">
        <div class="flex items-center mx-auto mr-4">
          <i class="fas fa-check-circle text-brand-green text-lg" />
        </div>
        <div class="text-left flex-grow">
          <p class="text-sm leading-normal">{{ item.title }}</p>
          <p class="text-sm text-gray-600">{{ item.author }}</p>
          <p class="text-sm text-gray-600">{{ item.published_at }}</p>
        </div>
      </div>

      <div
        class="text-sm leading-normal mt-5 body-content"
        v-html="item.content" />

      <template v-if="item.backlink">
        <div class="my-2">
          <a
            :href="item.backlink"
            target="_blank"
            class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded">
            Baca Selengkapnya
          </a>
        </div>
      </template>
    </template>

    <template v-else>
      <ContentLoader
        :speed="2"
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="0" y="15" rx="0" ry="0" width="100%" height="15" />
        <rect x="0" y="45" rx="0" ry="0" width="100%" height="75" />
      </ContentLoader>
    </template>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      isLoading: true,
      item: null
    }
  },
  watch: {
    id: {
      immediate: true,
      async handler (v) {
        if (!v) {
          return
        }
        this.fetchItem()
      }
    }
  },
  methods: {
    async fetchItem () {
      this.isLoading = true
      this.item = await this.$store
        .dispatch('announcement-list/fetchItemById', { id: this.id })
      this.isLoading = false
    }
  }
}
</script>
