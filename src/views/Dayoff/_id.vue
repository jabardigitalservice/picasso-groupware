<template>
  <div class="max-w-xl mx-auto my-16 p-6 md:p-8 bg-white rounded-lg shadow-lg">
    <DayoffDetail v-if="dayoffData" :data="dayoffData" />
  </div>
</template>

<script>
import DayoffDetail from '../../components/Attendance/DayoffDetail'
export default {
  components: {
    DayoffDetail
  },
  computed: {
    dayoffId () {
      return this.$route.params.id
    },
    dayoffData () {
      let data
      try {
        data = this.$store.state['dayoff-list'].itemsMap[this.dayoffId]
        if (data._id === this.dayoffId) {
          return data
        }
      } catch (e) {}
      return null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!vm.dayoffId || !vm.dayoffData) {
        vm.$router.replace('/dayoff')
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('dayoff-list/removeItemInCache', {
      id: this.dayoffId
    })
    next()
  }
}
</script>

<style lang="scss" scoped>
//
</style>
