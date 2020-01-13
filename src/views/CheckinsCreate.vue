<template>
  <div class="forums">
    <div class="container mx-auto">
      <div class="w-full bg-white shadow p-4">
        <div class="flex flex-wrap">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="input-message">
              Checkin Kehadiran
            </label>
            <textarea v-model="message" id="input-message" rows="5" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Contoh: Hadir di Command Center / Maulana Yusuf / Diskominfo atau Izin"/>
            <button @click="submit" class="w-full bg-brand-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Checkin
            </button>
            <router-link to="/checkins" class="w-full text-center shadow block bg-white text-gray-700 font-bold py-2 px-4 rounded mt-2">
              Cancel
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { analytics, db, FieldValue } from '@/lib/firebase'
import { format } from 'date-fns'

export default {
  components: {
    //
  },

  metaInfo: {
    title: 'Checkins'
  },

  data () {
    return {
      message: ''
    }
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  mounted () {
    analytics.logEvent('checkins_create_view')
  },

  methods: {
    async submit () {
      analytics.logEvent('checkins_click')

      const message = this.message

      if (message === '') {
        return false
      }

      const currentDate = new Date()
      const dbCurrentDate = format(currentDate, 'yyyyMMdd')

      await db.collection('checkins').doc(dbCurrentDate).set({})

      const collectionRef = await db.collection('checkins')
        .doc(dbCurrentDate)
        .collection('records')

      await collectionRef.add({
        message: message,
        user_name: this.user.name,
        user_photo: this.user.photo,
        checkin_at: FieldValue.serverTimestamp()
      })

      this.message = ''

      await this.$router.push('/checkins')
      await this.$store.dispatch('checkins-list/fetchItems')
    }
  }
}
</script>
