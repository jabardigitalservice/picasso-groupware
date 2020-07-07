<template>
  <div class="max-w-xl mx-auto mt-16 p-8 bg-white rounded shadow-xl">
    <header class="flex justify-between items-center">
      <h1 class="font-bold text-2xl text-green-600">
        Lihat Laporan
      </h1>
      <button
        class="cursor-pointer text-sm px-4 py-1 rounded-full text-brand-green border border-solid border-brand-green hover:bg-green-100"
        @click="onEdit">
        <i class="fa fa-pencil-alt mr-2"></i>
        <b class="uppercase">
          Edit
        </b>
      </button>
    </header>
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
    },
    onEdit () {
      this.$router.push({
        path: '/report/edit',
        query: {
          id: this.$route.query.id
        }
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
