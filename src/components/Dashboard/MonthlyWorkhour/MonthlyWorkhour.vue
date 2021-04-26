<template>
  <div class="monthly-workhour">
    <p class="monthly-workhour__title">
      Jam Kerja Bulan Ini
    </p>
    <WorkhourProgressBar
      :is-loading="isLoading"
      :hours="currentMonthWorkHours"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import WorkhourProgressBar from './WorkhourProgressBar.vue'
export default {
  components: {
    WorkhourProgressBar
  },
  computed: {
    ...mapState('users-dashboard', {
      isLoading: 'isLoading',
      currentMonthWorkHours (state) {
        const { itemsReportUser } = state
        return itemsReportUser
          ? itemsReportUser.total_office_hour_month
          : 0
      }
    })
  },
  mounted () {
    this.$store.dispatch('users-dashboard/getDashboardReportUser')
  }
}
</script>

<style lang="scss" scoped>
.monthly-workhour {
  &__title {
    @apply mb-3 text-base font-bold text-gray-900;
  }
}
</style>
