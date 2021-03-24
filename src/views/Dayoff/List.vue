<template>
  <div class="max-w-6xl mx-auto my-16 p-6 md:p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-xl mb-8">
      <strong>Izin</strong>
    </h1>
    <div class="sm:hidden">
      <button class="dayoff-btn-create" @click="onGoToDayoffForm">
        Laporkan Izin
      </button>
      <h2 class="text-base mt-8 mb-4">
        <strong>Daftar Izin</strong>
      </h2>
    </div>
    <DayoffList />
  </div>
</template>

<script>
import DayoffList from '../../components/Attendance/DayoffList'
export default {
  components: {
    DayoffList
  },
  methods: {
    onGoToDayoffForm () {
      this.$router.push({
        path: '/dayoff/create'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dayoff-btn-create {
  @apply bg-blue-500 text-white
  px-4 py-2 w-full rounded;
}
</style>
