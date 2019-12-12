<template>
  <div class="home">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full">
          <home-banner-list />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HomeBannerList from '@/components/HomeBannerList'

export default {
  name: 'home',
  components: {
    HomeBannerList
  },

  computed: mapGetters({
    authLoading: 'auth/loading'
  })
}
</script>
