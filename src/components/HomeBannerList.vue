<template>
  <div class="home-banner-list">
    <template v-if="!loading">
      <carousel class="shadow sm:mx-2" :autoplay="true" :autoplayTimeout="4000" :perPageCustom="[[768, 2], [1024, 4]]" :pagination-enabled="false" :per-page="1" :mouse-drag="false" :loop="true">
        <slide v-for="item in items" :key="item.id" class="item">
          <img class="w-full" :src="item.url" />
        </slide>
      </carousel>
    </template>
    <template v-else>
      <div class="bg-white sm:mx-2 shadow p-4">
        <content-loader :speed="2">
          <rect x="0" y="0" rx="0" ry="0" width="100%" height="220" />
        </content-loader>
      </div>
    </template>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

import { ContentLoader } from 'vue-content-loader'
import { mapGetters } from 'vuex'

export default {
  components: {
    Carousel,
    Slide,
    ContentLoader
  },

  computed: mapGetters({
    loading: 'home-banners/loading',
    items: 'home-banners/items'
  })
}
</script>
