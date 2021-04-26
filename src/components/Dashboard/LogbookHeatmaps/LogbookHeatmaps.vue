<template>
  <div class="logbook-heatmaps">
    <p class="logbook-heatmaps__title">
      Laporan Kamu
    </p>
    <div class="logbook-heatmaps__wrapper">
      <template v-for="item in listOfMonths">
        <MonthlyHeatmap
          class="flex-1"
          :key="`${item.year}/${item.month}`"
          :is-loading="isLoading"
          :month="item.month"
          :year="item.year" />
      </template>
      <div
        v-show="hasError"
        class="logbook-heatmaps__error-overlay">
        <p>
          Heatmap laporan sedang bermasalah.
          <br>
          Kami coba check dulu ya
        </p>
      </div>
    </div>
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
import { mapState, mapActions } from 'vuex'

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
      hasError: false,
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
    ...mapState('logbook-heatmap', {
      isLoading: 'isLoading'
    }),
    listOfMonths () {
      const today = new Date()
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
      .catch(() => {
        this.hasError = true
      })
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

  &__title {
    @apply mb-4 text-base font-bold
    text-gray-900;
  }

  &__btn-create {
    @apply w-full
    px-4 py-2
    rounded-md
    bg-green-600
    text-white;

    &:hover {
      @apply bg-green-500;
    }
  }

  &__wrapper {
    gap: 1rem;
    @apply mb-4 relative flex flex-row flex-wrap
    justify-start items-stretch;
  }

  &__error-overlay {
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: saturate(0%);
    @apply absolute inset-0
    flex justify-center items-center
    text-center;
  }
}
</style>
