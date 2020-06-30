<template>
  <div class="max-w-xl mx-auto mt-16 p-8 bg-white rounded shadow-xl">
    <h1 class="font-bold text-2xl text-green-600">
      Lihat Laporan
    </h1>
    <hr class="my-8"/>
    <FormLogbook
      action="view"
      :id="$route.query.id"
      @logbook:not-found="onLogbookNotFound"
    />
  </div>
</template>

<script>
export default {
  components: {
    FormLogbook: () => import('../../components/FormLogbook')
  },
  data () {
    return {
      logbook: null
    }
  },
  computed: {
    reportId () {
      return this.$route.query.id
    }
  },
  methods: {
    onLogbookNotFound () {
      this.$router.replace({
        path: '/report'
      })
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
