<template>
  <div>
    <template v-if="!isLoading">
      <dl class="mx-4 pt-2 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-2">
        <div class="bg-green-600 overflow-hidden shadow antialiased rounded-lg" style="border-radius: 20% 0 / 140px 0px">
          <div class="text-center ml-4 mr-2 pt-1">
            <b class="text-xs text-center text-white">Laporan Bulan Ini</b>
            <div class="text-center text-white text-2xl">
              {{ itemsReportUser.total_report_month }} <span class="text-sm">Task</span>
            </div>
          </div>
          <div class="text-center mr-2 sm:pl-8 lg:pr-8">
            <b class="text-xs text-justify text-white">Total Laporan Tahun Ini</b>
            <div class="text-1md text-center text-white">
              {{ itemsReportUser.total_report_year }} <span class="text-xs">Task</span>
            </div>
          </div>
        </div>
        <div class="bg-green-600 overflow-hidden shadow antialiased rounded-lg" style="border-radius: 20% 0 / 140px 0px">
          <div class="text-center ml-4 mr-2 pt-1">
            <b class="text-xs text-justify text-white">Jam Kerja Bulan Ini</b>
            <div class="text-center text-white text-2xl">
              {{ itemsReportUser.total_office_hour_month }} <span class="text-sm">Jam</span>
            </div>
          </div>
          <div class="text-center pb-3 mr-2 sm:pl-8 lg:pr-8">
            <b class="text-xs text-center text-white">Total Jam Kerja Tahun Ini</b>
            <div class="center text-white text-1md">
                {{ itemsReportUser.total_office_hour_year }} <span class="text-xs">Jam</span>
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
      </ContentLoader>
    </template>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapState } from 'vuex'

export default {
  components: {
    ContentLoader
  },

  data () {
    return {
      item: null
    }
  },

  computed: mapState('users-dashboard', {
    itemsReportUser: 'itemsReportUser',
    isLoading: 'isLoading'
  }),

  mounted () {
    this.loadData()
  },

  methods: {
    async loadData () {
      try {
        await this.$store.dispatch('users-dashboard/getDashboardReportUser')
        if (Array.isArray(this.itemsReportUser)) {
          if (this.itemsReportUser.length) {
            this.$emit('found')
          } else {
            this.$emit('empty')
          }
        }
      } catch (e) {
        this.$emit('error')
      }
    }
  }
}
</script>
