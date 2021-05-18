<template>
  <div class="events-list">
    <template v-if="!loading">
      <div class="flex flex-wrap">
        <template v-if="items.length > 0">
          <div v-for="item in items" :key="item.id" class="w-full bg-white shadow p-4 md:px-6" :class="getRowClass(item)">
            <div class="flex items-center">
              <div
                class="flex-none w-12 h-12 mr-4 md:mr-6">
                <component
                  v-if="hasValidMoodValue(item.mood)"
                  :is="getMoodComponent(item.mood)"
                  :css-filter="false" />
                <i
                  v-else
                  aria-hidden="true"
                  class="block w-full h-full rounded-full bg-white opacity-50" />
              </div>
              <div class="flex-auto text-sm">
                <p class="text-gray-900 font-bold">
                    {{ item['fullname'] }}
                </p>
                <p v-if="hasDivisionAndRole(item)"
                  class="text-gray-900 text-opacity-50 text-sm">
                  {{ item['divisi'] }} - {{ item['jabatan'] }}
                </p>
                <p v-if="item['message']" class="my-1"><span class="inline-block rounded-lg px-3 py-1 text-xs font-semibold text-white" :class="getStatusColor(item['message'])">{{ getStatusLabel(item['message'], item['location']) }}</span></p>
                <p v-if="item['note']" class="text-gray-900">{{ item['note'] }}</p>
                <p
                  v-if="isPresent(item)"
                  class="text-gray-800">
                  <template v-if="hasCheckout(item)">
                    {{ getCheckInDate(item) }} - {{ getCheckOutDate(item) }}
                  </template>
                  <template v-else>
                    {{ getCheckInDate(item) }}
                  </template>
                </p>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="w-full shadow bg-white mb-2 p-4">
            <div class="text-center">
              <i aria-hidden="true" class="fas fa-4x fa-sad-tear mb-4 text-gray-600" />
              <p class="text-sm">Belum ada yang checkin. Kantor sepi.</p>
            </div>
          </div>
        </template>
      </div>
    </template>
    <template v-else>
      <div v-for="n in 5" :key="n" class="bg-white shadow p-4">
        <content-loader
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="0" y="15" rx="0" ry="0" width="100%" height="15" />
          <rect x="0" y="45" rx="0" ry="0" width="100%" height="75" />
        </content-loader>
      </div>
    </template>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapGetters } from 'vuex'
import { formatTime } from '@/lib/date'
import { isBefore, isAfter, set } from 'date-fns'
import { ATTENDANCE } from '../lib/constants'
import { moods } from '../components/Reactions'

const moodValues = moods.map((m) => m.value)

export default {
  components: {
    ContentLoader
  },

  computed: mapGetters({
    loading: 'checkins-list/loading',
    items: 'checkins-list/items'
  }),

  methods: {
    formatTime,

    getStatusLabel (attendanceType, locationType) {
      if (attendanceType === ATTENDANCE.PRESENT) {
        let label = 'Hadir'
        return locationType
          ? `${label} - ${locationType}`
          : label
      }

      if (attendanceType === ATTENDANCE.LEAVE) {
        return 'Izin'
      }

      if (attendanceType === ATTENDANCE.SICK_LEAVE) {
        return 'Sakit'
      }

      if (attendanceType === ATTENDANCE.PAID_LEAVE) {
        return 'Cuti'
      }

      return '-'
    },

    getStatusColor (value) {
      if (value === ATTENDANCE.PRESENT) {
        return 'bg-green-500'
      }

      if (value === ATTENDANCE.LEAVE) {
        return 'bg-yellow-500'
      }

      if (value === ATTENDANCE.OTHER) {
        return 'bg-purple-500'
      }

      return 'bg-gray-800'
    },

    getRowClass (item) {
      if (item['message'] !== ATTENDANCE.PRESENT) {
        return 'bg-white'
      }

      const checkinDateTime = new Date(item['startDate'])
      const yellowLine = set(checkinDateTime, { hours: 8, minutes: 0, seconds: 0 })
      const redLine = set(checkinDateTime, { hours: 9, minutes: 0, seconds: 0 })

      if (isAfter(checkinDateTime, redLine)) {
        return 'bg-red-200'
      }

      if (isAfter(checkinDateTime, yellowLine)) {
        return 'bg-yellow-200'
      }

      if (isBefore(checkinDateTime, yellowLine)) {
        return 'bg-green-200'
      }

      return 'bg-white'
    },
    hasDivisionAndRole (item) {
      return !!item.divisi && !!item.jabatan
    },
    isPresent (item) {
      return item.message === ATTENDANCE.PRESENT
    },
    hasCheckout (item) {
      return item.endDate !== null
    },
    getCheckInDate (item) {
      const date = new Date(item.startDate)
      return formatTime(date)
    },
    getCheckOutDate (item) {
      const date = new Date(item.endDate)
      return formatTime(date)
    },
    hasValidMoodValue (moodValue) {
      return moodValues.includes(moodValue)
    },
    getMoodComponent (moodValue) {
      const matched = moods.find((m) => m.value === moodValue)
      return matched ? matched.component : null
    }
  }
}
</script>
