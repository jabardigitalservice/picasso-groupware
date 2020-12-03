<template>
  <Card class="my-4 mx-auto max-w-lg">
    <h1 class="text-xl font-bold">
      Checkin Hadir
    </h1>
    <hr class="my-4"/>
    <CheckinForm />
  </Card>
</template>

<script>
import Card from '../components/Card'

export default {
  components: {
    Card,
    CheckinForm: () => import('../components/Attendance/CheckinForm')
  },

  metaInfo: {
    title: 'Checkins'
  }
}
</script>

<style lang="scss" scoped>
</style>
