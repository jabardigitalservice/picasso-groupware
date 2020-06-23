<template>
  <div class="max-w-xl mx-auto mt-16 p-8 bg-white rounded shadow-xl">
    <h1 class="font-bold text-2xl text-green-600">
      Buat Laporan Baru
    </h1>
    <hr class="my-8"/>
    <FormLogbook :action="$route.params.action" :id="$route.query.id"/>
  </div>
</template>

<script>
export default {
  components: {
    FormLogbook: () => import('../../components/FormLogbook')
  },
  beforeRouteEnter (to, from, next) {
    if (!to.params.action) {
      next('/report')
      return
    }
    if (to.params.action === 'edit' && !to.query.id) {
      next('/report')
      return
    }
    next(vm => {
      vm.$store.dispatch('organizations/fetchProjects')
    })
  }
}
</script>

<style>

</style>
