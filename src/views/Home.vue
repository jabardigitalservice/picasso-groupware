<template>
  <div class="home no-pull-refresh">
    <div class="container mx-auto">
      <home-banner-list class="my-2" />

      <div class="mx-0 sm:mx-2 flex flex-wrap shadow bg-white">
        <div class="w-1/3">
          <router-link to="/underconstruction">
            <div class="h-full p-3 py-4  text-center text-gray-700">
              <i class="far fa-check-circle text-2xl" />
              <p class="text-xs mt-1">Checkin</p>
            </div>
          </router-link>
        </div>

        <div class="w-1/3">
          <router-link to="/underconstruction">
            <div class="h-full p-3 py-4  text-center text-gray-700">
              <i class="far fa-building text-2xl" />
              <p class="text-xs mt-1">Booking Ruangan</p>
            </div>
          </router-link>
        </div>

        <div class="w-1/3">
          <router-link to="/underconstruction">
            <div class="h-full p-3 py-4 text-center text-gray-700">
              <i class="fas fa-wine-bottle text-2xl" />
              <p class="text-xs mt-1">Pesan Kopi</p>
            </div>
          </router-link>
        </div>
      </div>

      <home-article-list class="mt-4" />
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
