<template>
  <div class="home-banner-list shadow">
    <template v-if="!loading">
      <carousel :pagination-enabled="false" :per-page="1" :mouse-drag="false">
        <slide v-for="item in items" :key="item.id" class="item">
          <div class="h-32 bg-cover bg-center" :style="`background-image: url(${item.url})`"></div>
        </slide>
      </carousel>
    </template>
    <template v-else>
      <content-loader :height="220" :width="640" :speed="2">
        <rect x="0" y="0" rx="0" ry="0" width="640" height="220" />
      </content-loader>
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
