<template>
  <ResponsiveComponentLoader
    for-mobile="Attendance/DayoffList/card-list.vue"
    for-desktop="Attendance/DayoffList/table.vue" />
</template>

<script>
import ResponsiveComponentLoader from '../../ResponsiveComponentLoader'
export default {
  components: {
    ResponsiveComponentLoader
  }
}
</script>

<style lang="scss" scoped>
//
</style>
