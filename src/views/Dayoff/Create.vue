<template>
  <Card class="my-4 mx-auto max-w-xl">
    <h1 class="text-xl font-bold">
      Checkin Izin
    </h1>
    <hr class="my-4"/>
    <DayoffForm />
  </Card>
</template>

<script>
export default {
  components: {
    Card: () => import('../../components/Card'),
    DayoffForm: () => import('../../components/Attendance/DayoffForm')
  }
}
</script>
