<template>
  <div class="home">
    <div class="container mx-auto">

      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/3">
          <home-banner-list class="mt-2" />

          <user-info class="mx-0 sm:mx-2 bg-white shadow" />

          <div class="mx-0 sm:mx-2 flex flex-wrap shadow bg-white">
            <template v-if="!user">
              <div class="w-full pt-4 text-center">
                <div class="">
                  <i class="far fa-4x fa-check-circle mb-4 text-gray-600" />
                  <p class="text-sm">Silahkan login terlebih dahulu</p>
                </div>
                <div class="mx-2 my-2">
                  <login-button class="mb-2"/>
                  <login-by-google-button/>
                </div>
              </div>
            </template>
            <template v-else>
              <AttendanceButton class="w-full"/>
              <div v-for="(m, index) in menuItems" :key="index" class="w-1/2">
                <router-link :to="m.to">
                  <div class="h-full p-3 py-4 text-center text-gray-700">
                    <i :class="[m.icon, 'text-2xl'] " />
                    <p class="text-xs mt-1">{{m.name}}</p>
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
import LoginByGoogleButton from '@/components/LoginByGoogleButton'
import HomeBannerList from '@/components/HomeBannerList'
import HomeArticleList from '@/components/HomeArticleList'
import UserInfo from '@/components/UserInfo'
import AttendanceButton from '@/components/AttendanceButton'

export default {
  name: 'home',
  components: {
    HomeBannerList,
    HomeArticleList,
    LoginButton,
    LoginByGoogleButton,
    UserInfo,
    AttendanceButton
  },

  metaInfo: {
    title: 'Home'
  },

  data () {
    return {
      menuItems: [
        // { name: 'Checkin', to: '/checkins', icon: 'far fa-check-circle' },
        { name: 'Laporan', to: '/report', icon: 'fa fa-book ' },
        { name: 'Kehadiran', to: '/checkins', icon: 'fa fa-user-friends ' }
        // { name: 'Events', to: '/events', icon: 'far fa-calendar ' },
        // { name: 'Thank You', to: '/thankyou', icon: 'far fa-heart ' },
        // { name: 'Teams', to: '/teams', icon: 'fas fa-user-friends ' },
        // { name: 'Booking', to: '/booking', icon: 'far fa-building ' },
        // { name: 'Pesan Kopi', to: '/underconstruction', icon: 'fas fa-wine-bottle ' }
      ]
    }
  },

  computed: mapGetters({
    // authLoading: 'auth/loading',
    user: 'auth/user'
  })
}
</script>
