<template>
  <div class="forums">
    <div class="container mx-auto">
      <div class="w-full bg-white shadow p-4">
        <div class="flex flex-wrap">
          <div class="w-full px-3">
            <ValidationObserver #default="{ handleSubmit, errors: errorFields }">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="input-type">
                Apakah Anda Hadir?
              </label>
              <ValidationProvider name="type" rules="required" #default="{errors}">
                <select v-model="type" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="input-type">
                  <option :value="null">Select...</option>
                  <option :value="ATTENDANCE.PRESENT">Hadir Dong</option>
                  <option :value="ATTENDANCE.LEAVE">Sakit / Izin</option>
                  <option :value="ATTENDANCE.OTHER">Into the Unknown</option>
                </select>
                <p
                  v-if="errors && errors.length"
                  class="form-input__error-hint">
                  Pilihan kehadiran harus terisi
                </p>
              </ValidationProvider>

              <div class="my-4" v-if="type === ATTENDANCE.PRESENT">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="input-type">
                  Jam Kehadiran
                </label>
                <div class="flex flex-row">
                  <ValidationProvider name="checkinHour" rules="required" >
                    <select v-model="checkinHour" class=" appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-3">
                      <option :value="null">Select...</option>
                      <option v-for="n in ['06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17]" :key="n">{{ n }}</option>
                    </select>
                  </ValidationProvider>
                  <ValidationProvider name="checkinMinute" rules="required" >
                    <select v-model="checkinMinute" class=" appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option :value="null">Select...</option>
                      <option v-for="n in ['00', '05', 15, 20, 25, 30, 35, 40, 45, 50, 55]" :key="n">{{ n }}</option>
                    </select>
                  </ValidationProvider>
                </div>
                <p
                  v-if="(errorFields.checkinHour && errorFields.checkinHour.length) || (errorFields.checkinMinute && errorFields.checkinMinute.length)"
                  class="form-input__error-hint block">
                  <span v-if="errorFields.checkinHour.length">
                    Jam <i class="italic">checkin</i> harus diisi
                  </span>
                  <span v-else-if="errorFields.checkinMinute.length">
                    Menit <i class="italic">checkin</i> harus diisi
                  </span>
                </p>
              </div>

              <div class="my-4">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="input-message">
                  Catatan
                </label>
                <ValidationProvider name="input-message" rules="required" #default="{ errors }">
                  <textarea v-model="message" id="input-message" rows="5" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Contoh: Hadir di Command Center / Maulana Yusuf / Diskominfo / Pantry / Izin Sakit / WFH" />
                  <p
                    v-if="errors && errors.length"
                    class="form-input__error-hint">
                    Catatan harus diisi
                  </p>
                </ValidationProvider>
              </div>
              <div class="-mx-2 flex flex-no-wrap">
                <button @click="handleSubmit(submit)" class="w-1/2 mx-2 bg-brand-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Checkin
                </button>
                <router-link to="/" class="w-1/2 mx-2 text-center shadow bg-white text-gray-700 font-bold py-2 px-4 rounded mt-2">
                  Cancel
                </router-link>
              </div>
            </ValidationObserver>
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
import { ATTENDANCE } from '../lib/constants'

export default {
  components: {
    //
  },

  metaInfo: {
    title: 'Checkins'
  },

  data () {
    return {
      ATTENDANCE,
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
      // eslint-disable-next-line no-unreachable
      const type = this.type
      const message = this.message
      const checkinHour = this.checkinHour
      const checkinMinute = this.checkinMinute

      if (type === null || message === '') {
        return false
      }

      if (type === ATTENDANCE.PRESENT) {
        if (checkinHour === null || checkinMinute === null) {
          return false
        }
      }

      let checkinAt = new Date()

      if (type === ATTENDANCE.PRESENT) {
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
