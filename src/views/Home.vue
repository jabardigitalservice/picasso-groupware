<template>
  <div class="home">
    <div class="container mx-auto">

      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/3">
          <home-banner-list class="mt-2" />

          <user-info class="mx-0 sm:mx-2 bg-white shadow" />

          <div class="mx-0 sm:mx-2 flex flex-wrap shadow bg-white">
            <div class="w-1/3">
              <router-link to="/checkins">
                <div class="h-full p-3 py-4 text-center text-gray-700">
                  <i class="far fa-check-circle text-2xl" />
                  <p class="text-xs mt-1">Checkin</p>
                </div>
              </router-link>
            </div>

            <div v-if="user" class="w-1/3">
              <router-link to="/events">
                <div class="h-full p-3 py-4  text-center text-gray-700">
                  <i class="far fa-calendar text-2xl" />
                  <p class="text-xs mt-1">Events</p>
                </div>
              </router-link>
            </div>

            <div v-if="user" class="w-1/3">
              <router-link to="/thankyou">
                <div class="h-full p-3 py-4 text-center text-gray-700">
                  <i class="far fa-heart text-2xl" />
                  <p class="text-xs mt-1">Thank You</p>
                </div>
              </router-link>
            </div>

            <div v-if="user" class="w-1/3">
              <router-link to="/profile">
                <div class="h-full p-3 py-4 text-center text-gray-700">
                  <i class="far fa-user text-2xl" />
                  <p class="text-xs mt-1">Account</p>
                </div>
              </router-link>
            </div>

            <div class="w-1/3">
              <router-link to="/booking">
                <div class="h-full p-3 py-4  text-center text-gray-700">
                  <i class="far fa-building text-2xl" />
                  <p class="text-xs mt-1">Reservasi Ruangan</p>
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
        </div>
        <div class="w-full md:w-2/3">
          <home-article-list class="mt-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HomeBannerList from '@/components/HomeBannerList'
import HomeArticleList from '@/components/HomeArticleList'
import UserInfo from '@/components/UserInfo'

export default {
  name: 'home',
  components: {
    HomeBannerList,
    HomeArticleList,
    UserInfo
  },

  metaInfo: {
    title: 'Home'
  },

  computed: mapGetters({
    // authLoading: 'auth/loading',
    user: 'auth/user'
  })
}
</script>
