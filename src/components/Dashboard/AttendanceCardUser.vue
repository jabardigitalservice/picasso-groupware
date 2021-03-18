<template>
  <div>
    <template v-if="!isLoading">
      <div>
        <FormSelect name="has_previous_job"
            :options="listMonths"
            prompt="Pilih bulan"
            v-model="month"/>
      </div>
      <dl class="mx-0 pt-1 grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-2">
        <div class="bg-green-500 overflow-hidden grid grid-cols-2 shadow antialiased rounded-lg">
          <div class="text-center text-white text-7xl ml-4 mr-2 my-8 lg:my-4">
            <i aria-hidden="true" class="fa fa-user-check fa-2x lg:fa-3x" />
          </div>
          <div class="text-center mr-2 sm:pl-8 lg:pr-8">
            <b class="text-sm text-justify text-white">Sudah Presensi</b>
            <div class="text-center text-white text-2xl">
              {{ itemsAttendanceUser.total_presence }}
            </div>
            <div class="text-1md text-center text-white">
              {{ itemsAttendanceUser.precentage_already_presence }} %
            </div>
          </div>
        </div>
        <div class="bg-red-600 overflow-hidden grid grid-cols-2 shadow antialiased rounded-lg">
          <div class="text-center text-white text-7xl ml-4 mr-2 my-8 lg:my-4">
            <i aria-hidden="true" class="fa fa-user-times fa-2x lg:fa-3x" />
          </div>
          <div class="text-center mr-2 sm:pl-8 lg:pr-8">
            <b class="text-sm text-justify text-white">Belum Presensi</b>
            <div class="text-center text-white text-2xl">
              {{ itemsAttendanceUser.total_no_presence }}
            </div>
            <div class="text-1md text-center text-white">
              {{ itemsAttendanceUser.precentage_no_presence }} %
            </div>
          </div>
        </div>
      </dl>
      <dl class="mx-0 pt-1 grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-2">
        <div class="bg-orange-500 overflow-hidden grid grid-cols-2 shadow antialiased rounded-lg">
          <div class="text-center text-white text-7xl ml-4 mr-2 my-8 lg:my-4">
            <i aria-hidden="true" class="fa fa-running fa-5x lg:fa-3x" />
          </div>
          <div class="relative">
            <div class="absolute bottom-0 right-0 text-center text-xl mb-2 sm:my-12 lg:my-10 lg:mr-16" style="right: 5%;">
                <b class="text-white">Terlambat</b>
                <div class="text-white">
                {{ itemsAttendanceUser.total_late_presence }}
                </div>
                <div class="text-white">
                {{ itemsAttendanceUser.precentage_late_presence }} %
                </div>
            </div>
          </div>
        </div>
        <dl class="mx-0 pt-1 grid grid-row-2 gap-2 sm:grid-row-2 lg:grid-row-2">
            <div class="bg-blue-800 overflow-hidden grid grid-cols-2 shadow antialiased rounded-lg">
            <div class="text-center text-white text-7xl ml-4 mr-2 my-8 lg:my-4">
                <i aria-hidden="true" class="fa fa-building fa-2x lg:fa-3x" />
            </div>
            <div class="text-center mr-2 sm:pl-8 lg:pr-8">
                <b class="text-sm text-justify text-white">Ada di Kantor</b>
                <div class="text-center text-white text-2xl">
                {{ itemsAttendanceUser.total_wfo }}
                </div>
                <div class="text-1md text-center text-white">
                {{ itemsAttendanceUser.precentage_wfo }} %
                </div>
            </div>
            </div>
            <div class="bg-blue-500 overflow-hidden grid grid-cols-2 shadow antialiased rounded-lg">
            <div class="text-center text-white text-7xl ml-4 mr-2 my-8 lg:my-4">
                <i aria-hidden="true" class="fa fa-book fa-2x lg:fa-3x" />
            </div>
            <div class="text-center mr-2 sm:pl-8 lg:pr-8">
                <b class="text-sm text-justify text-white">Izin tidak Masuk</b>
                <div class="text-center text-white text-2xl">
                {{ itemsAttendanceUser.total_permit }}
                </div>
                <div class="text-1md text-center text-white">
                {{ itemsAttendanceUser.precentage_total_permit }} %
                </div>
            </div>
            </div>
        </dl>
      </dl>
      <dl class="mx-0 pt-1 grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-2">
        <div class="bg-red-500 overflow-hidden grid grid-cols-2 shadow antialiased rounded-lg">
          <div class="text-center text-white text-7xl ml-4 mr-2 my-8 lg:my-4">
            <i aria-hidden="true" class="fa fa-calendar-day fa-2x lg:fa-3x" />
          </div>
          <div class="text-center mr-2 sm:pl-8 lg:pr-8">
            <b class="text-sm text-justify text-white">Presensi akhir Pekan</b>
            <div class="text-center text-white text-2xl">
              {{ itemsAttendanceUser.total_weekend_presence }}
            </div>
            <div class="text-1md text-center text-white">
              {{ itemsAttendanceUser.precentage_weekend_presence }} %
            </div>
          </div>
        </div>
        <div class="bg-blue-600 overflow-hidden grid grid-cols-2 shadow antialiased rounded-lg">
          <div class="text-center text-white text-7xl ml-4 mr-2 my-8 lg:my-4">
            <i aria-hidden="true" class="fa fa-car-side fa-2x lg:fa-3x" />
          </div>
          <div class="text-center mr-2 sm:pl-8 lg:pr-8">
            <b class="text-sm text-justify text-white">Perjadin</b>
            <div class="text-center text-white text-2xl">
              {{ itemsAttendanceUser.total_perjadin }}
            </div>
            <div class="text-1md text-center text-white">
              {{ itemsAttendanceUser.precentage_perjadin }} %
            </div>
          </div>
        </div>
      </dl>
    </template>
    <template v-else>
      <ContentLoader
        :speed="2"
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="0" y="55" rx="0" ry="0" width="100%" height="75" />
        <rect x="0" y="55" rx="0" ry="0" width="100%" height="75" />
      </ContentLoader>
    </template>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { listMonths } from '../../lib/constants'
import { mapState } from 'vuex'

export default {
  components: {
    ContentLoader,
    FormSelect: () => import('@/components/Form/Select')
  },

  data () {
    return {
      item: null,
      month: null,
      listMonths: listMonths
    }
  },

  computed: mapState('users-dashboard', {
    itemsAttendanceUser: 'itemsAttendanceUser',
    isLoading: 'isLoading'
  }),

  watch: {
    month: {
      immediate: true,
      handler (v) {
        const monthNum = this.monthNameToNum(v)
        if (monthNum !== 0) {
          this.loadData(monthNum)
        }
      }
    }
  },

  mounted () {
    const d = new Date()
    this.loadData(d.getMonth() + 1)
  },

  methods: {
    async loadData (month) {
      try {
        await this.$store.dispatch('users-dashboard/getDashboardAttendanceUser', { month: month })
        if (Array.isArray(this.itemsAttendanceUser)) {
          if (this.itemsAttendanceUser.length) {
            this.$emit('found')
          } else {
            this.$emit('empty')
          }
        }
      } catch (e) {
        this.$emit('error')
      }
    },
    monthNameToNum (monthname) {
      const month = this.listMonths.indexOf(monthname)
      return month ? month + 1 : null
    }
  }
}
</script>
