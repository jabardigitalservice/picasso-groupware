<template>
  <div class="max-w-xl mx-auto mt-16 p-8 bg-white rounded shadow-xl">
    <h1 class="font-bold text-2xl text-green-600">
      {{ pageTitle }}
    </h1>
    <hr class="my-8"/>
    <FormLogbook
      :action="$route.params.action"
      :id="$route.query.id"
      :on-cancel-callback="onActionCancelled"
      @logbook:not-found="onLogbookNotFound"/>
  </div>
</template>

<script>
export default {
  components: {
    FormLogbook: () => import('../../components/FormLogbook')
  },
  computed: {
    isCreating () {
      return this.$route.params.action === 'create'
    },
    isEditing () {
      return this.$route.params.action === 'edit'
    },
    pageTitle () {
      if (this.isCreating) {
        return 'Buat Laporan Baru'
      } else if (this.isEditing) {
        return 'Edit Laporan'
      }
      return null
    }
  },
  methods: {
    onLogbookNotFound () {
      this.$router.replace({
        path: '/report'
      })
    },
    onActionCancelled () {
      return this.$router.back()
    }
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
