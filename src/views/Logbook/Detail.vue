<template>
  <div>

  </div>

</template>

<script>
export default {
  computed: {
    reportId () {
      return this.$route.query.id
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!to.query.id) {
      next('/report')
    } else {
      next()
    }
  }
}
</script>

<style>

</style>
