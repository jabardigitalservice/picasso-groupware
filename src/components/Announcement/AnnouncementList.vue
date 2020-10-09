<template>
  <div class="w-full">
    <div class="flex flex-wrap">
      <div
        v-for="item in items"
        :key="item.id"
        class="w-full bg-white sm:rounded-lg shadow sm:mx-2 sm:mb-2 p-4">
        <router-link :to="`/announcement/${item.id}`">
          <div class="flex">
            <div class="flex items-center mx-auto mr-4">
              <i class="fas fa-star text-yellow-500 text-lg" />
            </div>
            <div class="text-left flex-grow">
              <p class="text-sm leading-normal">{{ item.title }}</p>
              <p class="text-sm text-gray-600">{{ item.author }}</p>
              <p class="text-sm text-gray-600">{{ item.published_at }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('announcement-list', {
      items: 'items',
      isLoading: 'isLoading'
    })
  },
  watch: {
    isLoading: {
      immediate: true,
      handler (v) {
        this.$emit('loading', v)
      }
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      try {
        await this.$store.dispatch('announcement-list/fetchItems')
        if (Array.isArray(this.items)) {
          if (this.items.length) {
            this.$emit('found')
          } else {
            this.$emit('empty')
          }
        }
      } catch (e) {
        this.$emit('error')
      }
    }
  }
}
</script>
