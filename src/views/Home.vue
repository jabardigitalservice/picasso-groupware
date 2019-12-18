<template>
  <div class="home no-pull-refresh">
    <div class="container mx-auto">
      <home-banner-list class="my-2" />
      <home-article-list />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HomeBannerList from '@/components/HomeBannerList'
import HomeArticleList from '@/components/HomeArticleList'

export default {
  name: 'home',
  components: {
    HomeBannerList,
    HomeArticleList
  },

  metaInfo: {
    title: 'Home'
  },

  computed: mapGetters({
    // authLoading: 'auth/loading'
  })
}
</script>
