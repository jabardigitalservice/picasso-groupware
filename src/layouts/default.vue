<template>
  <div class="select-none no-pull-refresh">
    <div v-if="showPopupNotification" class="bg-brand-yellow-darkest">
      <div class="container mx-auto">
        <div class="flex px-6 py-4">
          <div class="text-sm w-full">
            Izinkan notifikasi mengirim pesan
            <button @click="allowNotification" class="ml-2 bg-brand-blue text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Allow
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-brand-green-dark mb-8">
      <div class="container mx-auto px-4">
        <div class="relative bg-white mx-auto max-w-sm shadow rounded-lg overflow-hidden" style="top: 20px">
          <div class="flex px-6 py-4">
            <img class="block h-10 mx-auto mr-4" src="@/assets/logo.png" alt>
            <div class="text-left flex-grow">
              <p class="text-sm leading-normal">Groupware</p>
              <p class="text-sm text-gray-600">Jabar Digital Service</p>
            </div>
          </div>
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
import { db, FieldValue, messaging } from '@/lib/firebase'

export default {
  components: {
    Navbar
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

  mounted () {
    this.checkPermission()

    this.$store.dispatch('home-banners/fetchItems')
    this.$store.dispatch('home-articles/fetchItems')
    this.$store.dispatch('messages-list/fetchItems')
    this.$store.dispatch('events-list/fetchItems')
    this.$store.dispatch('thankyou-list/fetchItems')
    this.$store.dispatch('checkins-list/fetchItems')
  },

  methods: {
    async checkPermission () {
      if (!messaging) return

      const permission = await Notification.permission

      if (permission === 'default') {
        this.showPopupNotification = true
      }

      if (permission === 'granted') {
        const token = await messaging.getToken()

        this.saveToken(token)
      }
    },

    async allowNotification () {
      if (!messaging) return

      // Request Permission of Notifications
      const permission = await Notification.requestPermission()

      if (permission === 'granted') {
        const token = await messaging.getToken()

        this.saveToken(token)
      }

      messaging.onTokenRefresh(async () => {
        const token = await messaging.getToken()

        this.saveToken(token)
      })

      this.showPopupNotification = false
    },

    async saveToken (token) {
      const tokenRef = await db.collection('tokens').doc(token)
      const record = await tokenRef.get()

      if (record.exists === false) {
        tokenRef.set({
          'token': token,
          'createdAt': FieldValue.serverTimestamp()
        })
      }
    }
  }
}
</script>
