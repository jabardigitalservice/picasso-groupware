<template>
  <div class="task-report-heatmap">
    <template v-for="(item, index) in monthYearsToShow">
      <HeatmapMonthBlock
        v-show="index < monthsToShow"
        :key="`${item.year}/${item.month}`"
        :month="item.month"
        :year="item.year" />
    </template>
  </div>
</template>

<script>
import subMonths from 'date-fns/subMonths'
import HeatmapMonthBlock from './HeatmapMonthBlock'

export default {
  components: {
    HeatmapMonthBlock
  },
  provide () {
    return {
      heatmapColorConfig: this.colorConfig
    }
  },
  data () {
    return {
      monthsToShow: null,
      maximumMonthsToShow: 3,
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
    monthYearsToShow () {
      if (!this.maximumMonthsToShow) {
        return []
      }
      const range = this.maximumMonthsToShow
      const today = new Date()
      return new Array(range)
        .fill(null)
        .map((_, index) => {
          let date
          if (index < this.maximumMonthsToShow - 1) {
            date = subMonths(today, this.maximumMonthsToShow - 1 - index)
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
    this.listenToWindowResize()
    window.removeEventListener('resize', this.listenToWindowResize)
    setTimeout(() => {
      window.addEventListener('resize', this.listenToWindowResize)
    }, 50)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.listenToWindowResize)
  },
  methods: {
    listenToWindowResize () {
      const { innerWidth } = window
      if (innerWidth >= 768 && innerWidth < 1024) {
        this.monthsToShow = 2
      } else {
        this.monthsToShow = 3
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.task-report-heatmap {
  gap: 1rem;
  @apply flex flex-row justify-center items-stretch;
}
</style>
