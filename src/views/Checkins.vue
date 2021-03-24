<template>
  <div class="checkins">
    <div class="container mx-auto">
      <template v-if="!user">
        <div class="w-full pt-4">
          <div class="text-center">
            <i aria-hidden="true" class="far fa-4x fa-check-circle mb-4 text-gray-600" />
            <p class="text-sm">Silahkan login untuk melakukan checkin.</p>
          </div>

          <div class="mx-2 my-2">
            <login-button />
          </div>
        </div>
      </template>
      <template v-else>
        <div>
          <DateTime
            :value="selectedDate"
            :min-datetime="minDateTime"
            :max-datetime="maxDateTime"
            value-zone="UTC+7"
            type="date"
            format="DDDD"
            class="attendance-date-picker"
            input-class="attendance-date-picker-input"
            @input="changeDate">
          </DateTime>
          <checkins-list class="mt-2" :date="selectedDate" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Datetime as DateTime } from 'vue-datetime'
import { mapGetters } from 'vuex'

import LoginButton from '@/components/LoginButton'
import CheckinsList from '@/components/CheckinsList'
import { formatDateLong } from '@/lib/date'
import { format, subMonths } from 'date-fns'

export default {
  components: {
    DateTime,
    LoginButton,
    CheckinsList
  },

  metaInfo: {
    title: 'Checkins'
  },

  data () {
    return {
      minDateTime: subMonths(new Date(), 1).toISOString(),
      maxDateTime: new Date().toISOString(),
      selectedDate: null
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/user'
    }),
    formattedSelectedDate () {
      if (this.selectedDate) {
        return formatDateLong(new Date(this.selectedDate))
      }
      return ''
    }
  },

  watch: {
    '$route.query': {
      immediate: true,
      handler ({ date } = {}) {
        this.selectedDate = date || format(new Date(), 'yyyy-MM-dd')
        this.fetchItems(this.selectedDate)
      }
    }
  },

  created () {
    this.fetchItems(this.selectedDate)
  },

  methods: {
    format,
    formatDateLong,
    changeDate (date) {
      const mDate = format(new Date(date), 'yyyy-MM-dd')
      if (mDate !== this.selectedDate) {
        this.$router.push({
          query: {
            date: mDate
          }
        })
      }
    },

    async fetchItems (date) {
      await this.$store.dispatch('checkins-list/fetchItems', { date: date })
    }
  }
}
</script>

<style lang="scss">
.vdatetime.attendance-date-picker {
  @apply cursor-pointer relative flex items-center;

  &::after {
    content: '▼';
    transform: translateY(-0.25em);
    right: 1rem;
    @apply pointer-events-none
    absolute inline-block
    text-gray-700
    leading-none;
  }
}
.attendance-date-picker-input {
  @apply cursor-pointer w-full p-4 rounded-md border border-solid border-gray-300 mb-2;
}
</style>
