<template>
  <div class="select-none no-pull-refresh">
    <transition name="translate-to-bottom">
      <div
        v-if="showPopupNotification"
        class="h-16 overflow-hidden flex items-center bg-brand-yellow-darkest">
        <div class="container mx-auto px-6">
          <div class="text-sm w-full">
            Izinkan notifikasi mengirim pesan
            <button @click="allowNotification" class="ml-2 bg-brand-blue text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Allow
            </button>
          </div>
        </div>
      </div>
    </transition>

    <div class="bg-white mb-4 lg:mb-8">
      <div class="container mx-auto app-grid-layout">
        <div class="app-grid-layout__first-column">
          <DigiteamEmblem class="p-6" />
        </div>
        <div class="app-grid-layout__second-column">
          <!-- intentionally blank -->
        </div>
      </div>
    </div>
    <slot>
      <router-view />
    </slot>
    <navbar />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import { messaging } from '@/lib/firebase'
import { getDeviceTokenByUserId, retrieveToken, updateToken, listenToRefreshTokenEvent } from '../lib/fcm-notification'
import DigiteamEmblem from '../components/DigiteamEmblem.vue'

export default {
  components: {
    Navbar,
    DigiteamEmblem
  },

  computed: {
    // showPopupNotification () {
    //   return Notification.permission === 'default'
    // }
  },

  data () {
    return {
      showPopupNotification: false
    }
  },
  watch: {
    '$store.state.auth.user': {
      immediate: true,
      handler (v) {
        if (v) {
          this.checkPermission()
        }
      }
    }
  },

  mounted () {
    this.$store.dispatch('home-banners/fetchItems')
    this.$store.dispatch('home-articles/fetchItems')
    this.$store.dispatch('messages-list/fetchItems')
    this.$store.dispatch('events-list/fetchItems')
    this.$store.dispatch('thankyou-list/fetchItems')
    this.$store.dispatch('teams-list/fetchItems')
  },

  methods: {
    async checkPermission () {
      if (!messaging) return
      if (!this.$store.state.auth.user) return

      const permission = await Notification.permission

      if (permission === 'default') {
        this.showPopupNotification = true
      }

      if (permission === 'granted') {
        const existingToken = await getDeviceTokenByUserId(this.$store.state.auth.user.id)
        if (!existingToken) {
          await retrieveToken()
        }
        listenToRefreshTokenEvent()
      }
      if (permission === 'denied') {
        //
      }
    },

    async allowNotification () {
      if (!messaging) return

      // Request Permission of Notifications
      const permission = await Notification.requestPermission()

      if (permission === 'granted') {
        const existingToken = await getDeviceTokenByUserId(this.$store.state.auth.user.id)
        if (!existingToken) {
          await retrieveToken()
        } else {
          await updateToken()
        }
        listenToRefreshTokenEvent()
      }

      this.showPopupNotification = false
    }
  }
}
</script>

<style lang="scss" scoped>
.translate-to-bottom {
  &-enter-active,
  &-leave-active {
    transition-property: height;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
    transition-delay: 1s;
  }

  &-enter,
  &-leave-to {
    height: 0px;
  }
}
</style>
