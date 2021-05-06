<template>
  <div class="home-article-list">
    <template v-if="!loading">
      <router-link
        v-for="item in items"
        :key="item.id"
        class="home-article-list__list-item"
        :to="`/articles/${item.id}`">
        <i
          aria-hidden="true"
          class="fas fa-check-circle text-brand-green text-lg mr-4"
        />
        <div class="text-left text-sm flex-grow">
          <p class="leading-normal">{{ item['title'] }}</p>
          <p class="text-gray-600">{{ item['author_name'] }}</p>
        </div>
      </router-link>
    </template>
    <template v-else>
      <div
        v-for="n in 5"
        :key="n"
        class="home-article-list__list-item">
        <i aria-hidden="true" class="w-6 h-6 rounded-full bg-shimmering mr-4 my-2" />
        <div class="flex-grow">
          <i aria-hidden="true" class="block w-full max-w-md h-2 rounded-full bg-shimmering mb-4" />
          <i aria-hidden="true" class="block w-full max-w-xs h-2 rounded-full bg-shimmering "/>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDateTimeShort } from '@/lib/date'

export default {
  computed: mapGetters({
    loading: 'home-articles/loading',
    items: 'home-articles/items'
  }),

  methods: {
    formatDateTimeShort
  }
}
</script>

<style lang="scss" scoped>
.home-article-list {
  &__list-item {
    @apply p-4
    flex items-center
    bg-white
    shadow;

    @screen sm {
      @apply rounded-lg;
    }

    & + & {
      @apply mt-2;
    }
  }
}
</style>
