<template>
  <div>
    <div class="container mx-auto">
      <div class="app-grid-layout">
        <div class="app-grid-layout__first-column">
          <div
            v-if="user"
            class="home-card mb-4">
            <user-info />
          </div>

          <div>
            <div v-if="!user">
              <h5 class="home-section-title">
                Login
              </h5>
              <div
                class="home-card">
                <login-username-password />
                <span class="login-button-separator">
                  ATAU
                </span>
                <login-by-google-button />
              </div>
            </div>
            <template v-else>
              <div class="home-card mb-4">
                <MonthlyWorkhour />
                <AttendanceButton class="mt-8"/>
              </div>
              <div class="home-card mb-4">
                <LogbookHeatmaps />
              </div>
              <div class="home-card mb-4">
                <div class="grid grid-cols-3 gap-12">
                  <component
                    v-for="(m, index) in menuItems"
                    :key="index"
                    :is="getMenuLinkComponent(m)"
                    v-bind="getMenuLinkProps(m)" >
                    <div class="text-center text-gray-700">
                      <i aria-hidden="true" :class="[m.icon, 'text-2xl'] " />
                      <p class="text-xs mt-1">{{m.name}}</p>
                    </div>
                  </component>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="app-grid-layout__second-column">
          <div v-if="user" v-show="showAnnouncement">
            <h5 class="font-bold text-lg m-4 mt-0 leading-none">
              Pengumuman Penting
            </h5>
            <AnnouncementList class="mt-2" @found="showAnnouncement = true" />
          </div>
          <h5 class="home-section-title">
            Artikel
          </h5>
          <HomeArticleList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginByGoogleButton from '@/components/LoginByGoogleButton'
import LogbookHeatmaps from '@/components/Dashboard/LogbookHeatmaps/LogbookHeatmaps'
import AnnouncementList from '@/components/Announcement/AnnouncementList'
import HomeArticleList from '@/components/HomeArticleList'
import UserInfo from '@/components/UserInfo'
import AttendanceButton from '@/components/AttendanceButton'
import MonthlyWorkhour from '@/components/Dashboard/MonthlyWorkhour/MonthlyWorkhour'
import LoginUsernamePassword from '../components/LoginUsernamePassword.vue'

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
    href: [process.env.VUE_APP_SKEDDA_URL, '_blank'],
    icon: 'fa fa-book'
  },
  {
    name: 'Wiki',
    href: ['https://wiki.digitalservice.id/', '_blank'],
    icon: 'fas fa-file-word'
  }
])

export default {
  name: 'home',
  components: {
    AnnouncementList,
    HomeArticleList,
    LogbookHeatmaps,
    LoginByGoogleButton,
    UserInfo,
    AttendanceButton,
    MonthlyWorkhour,
    LoginUsernamePassword
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

<style lang="scss" scoped>
.home-card {
  box-shadow: 0 8px 36px 0px rgba(120, 144, 156, 0.15);

  @apply overflow-hidden p-6
  border-none
  rounded-none
  bg-white;

  @screen sm {
    @apply rounded-lg;
  }
}

.home-section-title {
  @apply font-bold text-lg mx-6 my-4;
}

.login-button-separator {
  @apply my-4 flex items-center
  text-gray-500 text-xs font-bold;

  &::before,
  &::after {
    content: '';
    height: 1px;
    @apply mx-4 flex-1 bg-gray-300;
  }
}
</style>
