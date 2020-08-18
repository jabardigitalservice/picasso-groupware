<template>
  <div class="max-w-6xl mx-auto my-16 p-6 md:p-8 bg-white rounded-lg shadow-lg">
    <LogbookList/>
  </div>
</template>

<script>
export default {
  components: {
    LogbookList: () => import('../../components/LogbookList/index.js')
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('organizations/fetchProjects')
    })
  }
}
</script>

<style>

</style>
