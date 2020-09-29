<template>
  <Card class="my-4 mx-auto max-w-lg">
    <h1 class="text-xl font-bold">
      Checkin Hadir
    </h1>
    <hr class="my-4"/>
    <CheckinForm />
  </Card>
</template>

<script>
import { mapGetters } from 'vuex'
import { setHours, setMinutes, setSeconds } from 'date-fns'
import { GroupwareAPI } from '../lib/axios'
import { ATTENDANCE } from '../lib/constants'
import Card from '../components/Card'

export default {
  components: {
    Card,
    CheckinForm: () => import('../components/Attendance/CheckinForm')
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
</style>
