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
              <ReportCardUser class="w-full flex-col" />
              <AttendanceButton class="w-full"/>
              <div v-for="(m, index) in menuItems" :key="index" class="w-1/3">
                <component :is="getMenuLinkComponent(m)" v-bind="getMenuLinkProps(m)" >
                  <div class="h-full p-3 py-4 text-center text-gray-700">
                    <i :class="[m.icon, 'text-2xl'] " />
                    <p class="text-xs mt-1">{{m.name}}</p>
                  </div>
                </component>
              </div>
            </template>
          </div>
        </div>
        <div class="w-full md:w-2/3">
          <div v-if="user" v-show="showAnnouncement">
            <h5 class="font-bold text-lg m-4">
              Pengumuman Penting
            </h5>
            <AnnouncementList class="mt-2" @found="showAnnouncement = true" />
          </div>
          <h5 class="font-bold text-lg m-4">
            Artikel
          </h5>
          <HomeArticleList class="mt-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginButton from '@/components/LoginButton'
import LoginByGoogleButton from '@/components/LoginByGoogleButton'
import ReportCardUser from '@/components/Dashboard/ReportCardUser'
import HomeBannerList from '@/components/HomeBannerList'
import AnnouncementList from '@/components/Announcement/AnnouncementList'
import HomeArticleList from '@/components/HomeArticleList'
import UserInfo from '@/components/UserInfo'
import AttendanceButton from '@/components/AttendanceButton'

const menuItems = Object.freeze([
  {
    name: 'Izin',
    to: '/dayoff',
    icon: 'fa fa-user-clock'
  },
  {
    name: 'Kehadiran',
    to: '/checkins',
    icon: 'fa fa-user-friends '
  },
  {
    name: 'Laporan',
    to: '/report',
    icon: 'fa fa-book '
  },
  {
    name: 'Agenda',
    href: ['https://calendar.google.com/calendar/u/0?cid=ZHEzMWhiYWlqdnAydXVyc3ZhbjE3ZnB1cW9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', '_blank'],
    icon: 'fa fa-calendar-alt'
  },
  {
    name: 'Booking',
    href: ['https://bit.ly/SkeddaBooking-JDS', '_blank'],
    icon: 'fa fa-book'
  },
  {
    name: 'Wiki',
    href: ['https://wiki.digitalservice.id/', '_blank'],
    icon: 'far fa-file-word'
  }
])

export default {
  name: 'home',
  components: {
    HomeBannerList,
    AnnouncementList,
    HomeArticleList,
    ReportCardUser,
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
      menuItems,
      showAnnouncement: false
    }
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  methods: {
    getMenuLinkComponent (menu) {
      if (menu.to) {
        return 'RouterLink'
      }
      if (menu.href) {
        return 'a'
      }
      return null
    },
    getMenuLinkProps (menu) {
      if (menu.to) {
        return { to: menu.to }
      }
      if (menu.href) {
        return {
          href: menu.href[0],
          target: menu.href[1]
        }
      }
      return null
    }
  }
}
</script>
