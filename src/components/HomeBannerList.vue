<template>
  <div class="home-banner-list">
    <template v-if="!loading">
      <carousel :autoplay="true" :autoplayTimeout="4000" :perPageCustom="[[768, 2], [1024, 4]]" :pagination-enabled="false" :per-page="1" :mouse-drag="false">
        <slide v-for="item in items" :key="item.id" class="item">
          <div class="mx-2 h-32 bg-cover bg-center rounded-lg shadow" :style="`background-image: url(${item.url})`"></div>
        </slide>
      </carousel>
    </template>
    <template v-else>
      <div class="mx-2 bg-white rounded-lg shadow p-4">
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
