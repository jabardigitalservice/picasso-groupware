<template>
  <div class="home">
    <div class="container mx-auto">

      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/3">
          <home-banner-list class="mt-2" />

          <user-info class="mx-0 sm:mx-2 bg-white shadow" />

          <div class="mx-0 sm:mx-2 flex flex-wrap shadow bg-white">
            <template v-if="!user">
              <div class="w-full pt-4">
                <div class="text-center">
                  <i class="far fa-4x fa-check-circle mb-4 text-gray-600" />
                  <p class="text-sm">Silahkan login untuk melakukan checkin.</p>
                </div>

                <div class="mx-2 my-2">
                  <login-button />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="w-1/3">
                <router-link to="/checkins">
                  <div class="h-full p-3 py-4 text-center text-gray-700">
                    <i class="far fa-check-circle text-2xl" />
                    <p class="text-xs mt-1">Checkin</p>
                  </div>
                </router-link>
              </div>
              <div class="w-1/3">
                <router-link to="/report">
                  <div class="h-full p-3 py-4  text-center text-gray-700">
                    <i class="fa fa-book text-2xl" />
                    <p class="text-xs mt-1">Laporan</p>
                  </div>
                </router-link>
              </div>
              <div class="w-1/3">
                <router-link to="/events">
                  <div class="h-full p-3 py-4  text-center text-gray-700">
                    <i class="far fa-calendar text-2xl" />
                    <p class="text-xs mt-1">Events</p>
                  </div>
                </router-link>
              </div>
              <div class="w-1/3">
                <router-link to="/thankyou">
                  <div class="h-full p-3 py-4 text-center text-gray-700">
                    <i class="far fa-heart text-2xl" />
                    <p class="text-xs mt-1">Thank You</p>
                  </div>
                </router-link>
              </div>
              <div class="w-1/3">
                <router-link to="/teams">
                  <div class="h-full p-3 py-4 text-center text-gray-700">
                    <i class="fas fa-user-friends text-2xl" />
                    <p class="text-xs mt-1">Teams</p>
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
            </template>
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
import LoginButton from '@/components/LoginButton'
import HomeBannerList from '@/components/HomeBannerList'
import HomeArticleList from '@/components/HomeArticleList'
import UserInfo from '@/components/UserInfo'

export default {
  name: 'home',
  components: {
    HomeBannerList,
    HomeArticleList,
    LoginButton,
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
