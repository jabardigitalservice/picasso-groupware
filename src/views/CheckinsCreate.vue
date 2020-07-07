<template>
  <div class="forums">
    <div class="container mx-auto">
      <div class="w-full bg-white shadow p-4">
        <div class="flex flex-wrap">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="input-type">
              Apakah Anda Hadir?
            </label>
            <select v-model="type" class="h-12 sm:h-10 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="input-type">
              <option :value="null">Select...</option>
              <option value="HADIR">Hadir Dong</option>
              <option value="IZIN">Sakit / Izin</option>
              <option value="OTHER">Into the Unknown</option>
            </select>

            <div class="my-4" v-if="type === 'HADIR'">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="input-type">
                Jam Kehadiran
              </label>
              <div class="flex flex-row">
                <select v-model="checkinHour" class="h-12 sm:h-10 sm:w-16 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-3">
                  <option :value="null">Select...</option>
                  <option v-for="n in ['06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17]" :key="n">{{ n }}</option>
                </select>
                <select v-model="checkinMinute" class="h-12 sm:h-10 sm:w-16 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option :value="null">Select...</option>
                  <option v-for="n in ['00', '05', 15, 20, 25, 30, 35, 40, 45, 50, 55]" :key="n">{{ n }}</option>
                </select>
              </div>
            </div>

            <div class="my-4">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="input-message">
                Catatan
              </label>
              <textarea v-model="message" id="input-message" rows="5" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Contoh: Hadir di Command Center / Maulana Yusuf / Diskominfo / Pantry / Izin Sakit / WFH" />
            </div>
            <div class="-mx-2 flex flex-no-wrap">
              <button @click="submit" class="w-1/2 mx-2 bg-brand-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Checkin
              </button>
              <router-link to="/" class="w-1/2 mx-2 text-center shadow bg-white text-gray-700 font-bold py-2 px-4 rounded mt-2">
                Cancel
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { setHours, setMinutes, setSeconds } from 'date-fns'
import { GroupwareAPI } from '../lib/axios'

export default {
  components: {
    //
  },

  metaInfo: {
    title: 'Checkins'
  },

  data () {
    return {
      type: null,
      message: '',
      checkinHour: null,
      checkinMinute: null
    }
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  methods: {
    async submit () {
      const type = this.type
      const message = this.message
      const checkinHour = this.checkinHour
      const checkinMinute = this.checkinMinute

      if (type === null || message === '') {
        return false
      }

      if (type === 'HADIR') {
        if (checkinHour === null || checkinMinute === null) {
          return false
        }
      }

      let checkinAt = new Date()

      if (type === 'HADIR') {
        checkinAt = setHours(checkinAt, checkinHour)
        checkinAt = setMinutes(checkinAt, checkinMinute)
        checkinAt = setSeconds(checkinAt, 0)
      }

      const payload = {
        date: checkinAt,
        location: this.message,
        message: this.type
      }

      await GroupwareAPI.post('attendance/checkin', payload)
      await this.$store.dispatch('checkins-list/getCheckinState', { refresh: true })
      await this.$router.push('/checkins')
      await this.$store.dispatch('checkins-list/fetchItems')
    }
  }
}
</script>
