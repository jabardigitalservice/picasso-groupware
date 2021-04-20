<template>
  <div class="logbook-heatmaps">
    <p class="logbook-heatmaps__title">
      Laporan Kamu
    </p>
    <template v-for="item in listOfMonths">
      <MonthlyHeatmap
        class="flex-1"
        :key="`${item.year}/${item.month}`"
        :month="item.month"
        :year="item.year" />
    </template>
    <button
      class="logbook-heatmaps__btn-create"
      @click="onCreateNewLogbook">
      + Buat Laporan Baru
    </button>
  </div>
</template>

<script>
import subMonths from 'date-fns/subMonths'
import MonthlyHeatmap from './MonthlyHeatmap'
import { mapActions } from 'vuex'

export default {
  components: {
    MonthlyHeatmap
  },
  provide () {
    return {
      heatmapColorConfig: this.colorConfig
    }
  },
  data () {
    return {
      numOfMonths: 2,
      colorConfig: [
        [0, '#ECEFF1'],
        [1, '#C8E6C9'],
        [3, '#81C784'],
        [5, '#4CAF50'],
        [7, '#388E3C'],
        [9, '#1B5E20'],
        [11, '#004D40']
      ]
    }
  },
  computed: {
    listOfMonths () {
      const today = new Date(2021, 2)
      return new Array(this.numOfMonths)
        .fill(null)
        .map((_, index) => {
          let date
          if (index < this.numOfMonths - 1) {
            date = subMonths(today, this.numOfMonths - 1 - index)
          } else {
            date = today
          }
          return {
            month: date.getMonth(),
            year: date.getFullYear()
          }
        })
    }
  },
  mounted () {
    this.fetchAllLogbookData()
  },
  methods: {
    ...mapActions('logbook-heatmap', [
      'fetchAllLogbookData'
    ]),
    onCreateNewLogbook () {
      this.$router.push({
        path: '/report/create'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logbook-heatmaps {
  gap: 1rem;
  @apply flex flex-row flex-wrap
  justify-start items-stretch;

  &__title {
    @apply flex-none w-full
    text-base font-bold
    text-gray-700;
  }

  &__btn-create {
    @apply flex-none w-full
    px-4 py-2
    rounded-md
    bg-green-600
    text-white;

    &:hover {
      @apply bg-green-500;
    }
  }
}
</style>
