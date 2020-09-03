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
                  <option :value="ATTENDANCE.PRESENT">Hadir</option>
                  <option :value="ATTENDANCE.LEAVE">Izin</option>
                  <option :value="ATTENDANCE.SICK_LEAVE">Sakit</option>
                  <option :value="ATTENDANCE.PAID_LEAVE">Cuti</option>
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
                    <select v-model="checkinHour" class=" appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-3">
                      <option :value="null">Select...</option>
                      <option v-for="n in hourOptions" :key="n">{{ n }}</option>
                    </select>
                  </ValidationProvider>
                  <ValidationProvider name="checkinMinute" rules="required" >
                    <select v-model="checkinMinute" class=" appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option :value="null">Select...</option>
                      <option v-for="n in minuteOptions" :key="n">{{ n }}</option>
                    </select>
                  </ValidationProvider>
                </div>
                <p
                  v-if="(errorFields.checkinHour && errorFields.checkinHour.length) || (errorFields.checkinMinute && errorFields.checkinMinute.length)"
                  class="form-input__error-hint block" style="margin-top: 0.5rem;">
                  <span v-if="errorFields.checkinHour.length">
                    Jam <i class="italic">checkin</i> harus diisi
                  </span>
                  <span v-else-if="errorFields.checkinMinute.length">
                    Menit <i class="italic">checkin</i> harus diisi
                  </span>
                </p>
              </div>

              <div v-if="showLocationRadios">
                <ValidationProvider name="input-message" rules="required" #default="{ errors }">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="input-message">
                    Lokasi
                  </label>
                  <fieldset>
                    <label
                      v-for="(opt, i) in locationOpts"
                      :key="i"
                      class="location-radio">
                      <input v-if="i === 0" type="radio" v-model="message" :value="opt" name="input-message">
                      <input v-else type="radio" :value="opt" name="input-message" @change="message = opt">
                      {{ opt }}
                    </label>
                  </fieldset>
                  <p
                    v-if="errors && errors.length"
                    class="form-input__error-hint" style="margin-top: 0.5rem;">
                    Lokasi harus diisi
                  </p>
                </ValidationProvider>
              </div>
              <div v-if="showNoteTextarea" class="my-4">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="input-message">
                  Catatan
                </label>
                <ValidationProvider name="input-message" :rules="isNoteTextAreaRequired" #default="{ errors }">
                  <textarea :value="noteTextAreaValue" @input="onNoteTextAreaInput" id="input-message" rows="5" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" :placeholder="notePlaceholder" />
                  <p
                    v-if="errors && errors.length"
                    class="form-input__error-hint">
                    Catatan harus diisi
                  </p>
                </ValidationProvider>
              </div>
              <br/>
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
      note: '',
      message: '',
      checkinHour: null,
      checkinMinute: null,
      locationOpts: [
        'WFH',
        'WFO',
        'PERJADIN'
      ]
    }
  },

  computed: {
    hourOptions () {
      return new Array(24).fill(null).map((_, n) => {
        if (n < 10) {
          return `0${n}`
        }
        return `${n}`
      })
    },
    minuteOptions () {
      return new Array(60 / 5).fill(null).map((_, n) => {
        if (n < 10 / 5) {
          return `0${n * 5}`
        }
        return 5 * n
      })
    },
    ...mapGetters({
      user: 'auth/user'
    }),
    showNoteTextarea () {
      return [
        ATTENDANCE.PRESENT,
        ATTENDANCE.LEAVE,
        ATTENDANCE.SICK_LEAVE,
        ATTENDANCE.PAID_LEAVE
      ].includes(this.type)
    },
    isNoteTextAreaRequired () {
      const required = [
        ATTENDANCE.LEAVE,
        ATTENDANCE.SICK_LEAVE,
        ATTENDANCE.PAID_LEAVE
      ].includes(this.type)

      return required ? 'required' : ''
    },
    notePlaceholder () {
      switch (this.type) {
        case ATTENDANCE.LEAVE:
        case ATTENDANCE.SICK_LEAVE:
        case ATTENDANCE.PAID_LEAVE:
          return 'Keterangan izin / sakit / cuti'
        case ATTENDANCE.PRESENT:
          return 'Keterangan  hadir (opsional)'
        default:
          return ''
      }
    },
    noteTextAreaValue () {
      switch (this.type) {
        case ATTENDANCE.LEAVE:
        case ATTENDANCE.SICK_LEAVE:
        case ATTENDANCE.PAID_LEAVE:
          return this.message
        case ATTENDANCE.PRESENT:
          return this.note
        default:
          return ''
      }
    },
    showLocationRadios () {
      return this.type === ATTENDANCE.PRESENT
    }
  },
  watch: {
    type: {
      immediate: true,
      handler (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.message = ''
          this.note = ''
        }
      }
    }
  },

  methods: {
    onNoteTextAreaInput (e) {
      const { value } = e.target
      switch (this.type) {
        case ATTENDANCE.LEAVE:
        case ATTENDANCE.SICK_LEAVE:
        case ATTENDANCE.PAID_LEAVE:
          this.message = value
          break
        case ATTENDANCE.PRESENT:
          this.note = value
          break
        default:
          return ''
      }
    },
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
        message: this.type,
        note: this.note
      }

      await GroupwareAPI.post('attendance/checkin', payload)
      await this.$store.dispatch('checkins-list/getCheckinState', { refresh: true })
      await this.$store.dispatch('checkins-list/getCheckoutState', { refresh: true })
      await this.$router.push('/checkins')
      await this.$store.dispatch('checkins-list/fetchItems')
    }
  }
}
</script>

<style lang="scss" scoped>
.location-radio {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #eee;

  & + & {
    margin-left: 1rem;
  }
}
</style>
