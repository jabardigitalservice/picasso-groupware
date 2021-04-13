<template>
  <div class="heatmap-month-block">
    <div
      v-if="isLoading"
      class="flex flex-col justify-center items-center"
      :style="{ width: `${blockWidth}px`, height: `${blockHeight}px` }">
      <!-- TODO: add loading hint here -->
    </div>
    <svg
      v-else
      class="heatmap-month-block__day-blocks-wrapper"
      :key="`${year}/${month}`"
      :width="`${blockWidth}px`"
      :height="`${blockHeight}px`"
      x="0"
      y="0">
      <g v-for="i in startOfMonthOffsetInDays"
        :key="`offset:${i}`"
        role="offset"
        class="heatmap-month-block__day-block">
        <rect
          fill="transparent"
          :width="rectSize"
          :height="rectSize"
          :x="getRectX(i - 1)"
          :y="getRectY(i - 1)" />
      </g>
      <g
        v-for="(dateNum, index) in numOfDays"
        :key="dateNum"
        class="heatmap-month-block__day-block"
        fill="transparent">
        <rect
          :style="{
            fill: getHeatColorByDateNum(dateNum)
          }"
          :width="rectSize"
          :height="rectSize"
          :x="getRectX(index + startOfMonthOffsetInDays)"
          :y="getRectY(index + startOfMonthOffsetInDays)" />
        <title>
          {{ getTooltipContentByDateNum(dateNum) }}
        </title>
      </g>
    </svg>
    <span
      class="heatmap-month-block__month-name">
      {{ monthName }}
    </span>
  </div>
</template>

<script>
import formatDate from 'date-fns/format'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import differenceInDays from 'date-fns/differenceInDays'
import startOfWeek from 'date-fns/startOfWeek'
import { formatDateShort } from '../../../lib/date'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  inject: {
    heatmapColorConfig: {
      from: 'heatmapColorConfig',
      default: () => []
    }
  },
  props: {
    month: {
      type: Number
    },
    year: {
      type: Number
    }
  },
  data () {
    return {
      rectGap: 2,
      rectSize: 12,
      isLoading: false,
      defaultColor: '#ECEFF1'
    }
  },
  computed: {
    ...mapState('logbook-heatmap', {
      heatmapData (state) {
        const key = `${parseInt(this.year)}/${parseInt(this.month)}`
        return state.dataByMonthYear[key] || null
      }
    }),
    ...mapGetters('logbook-heatmap', [
      'getTaskCountByDate'
    ]),
    startOfMonthOffsetInDays () {
      const calendarStart = startOfWeek(
        new Date(this.year, this.month),
        {
          weekStartsOn: 1
        })
      const monthStart = new Date(this.year, this.month, 1)
      return differenceInDays(monthStart, calendarStart)
    },
    numOfDays () {
      const { month, year } = this
      if (typeof month !== 'number' || typeof year !== 'number') {
        return 0
      }
      return getDaysInMonth(new Date(year, month))
    },
    monthName () {
      return formatDate(new Date(this.year, this.month), 'MMMM')
    },
    blockWidth () {
      return ((this.rectSize + this.rectGap) * 5) + this.rectGap
    },
    blockHeight () {
      return ((this.rectSize + this.rectGap) * 7) + this.rectGap
    }
  },
  async mounted () {
    this.$watch(
      function () {
        return `${this.year}/${this.month}`
      },
      function (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.loadData()
        }
      },
      { immediate: true, deep: true }
    )
  },
  methods: {
    ...mapActions('logbook-heatmap', [
      'getHeatmapData'
    ]),
    loadData () {
      this.isLoading = true
      this.getHeatmapData({
        month: this.month,
        year: this.year
      }).finally(() => {
        this.isLoading = false
      })
    },
    getRectY (itemIndex) {
      return ((itemIndex % 7)) * (this.rectSize + this.rectGap)
    },
    getRectX (itemIndex) {
      const colNum = Math.floor(itemIndex / 7)
      return colNum * (this.rectSize + this.rectGap)
    },

    getTooltipContentByDateNum (dateNum) {
      const dateObj = new Date(this.year, this.month, dateNum)
      const taskCount = this.getTaskCountByDate(dateObj)
      if (taskCount > 0) {
        return `${taskCount} laporan pada ${formatDateShort(dateObj)}`
      }
      return `${formatDateShort(dateObj)}`
    },
    getHeatColorByDateNum (dateNum) {
      if (this.isLoading) {
        return this.defaultColor
      }
      const dateObj = new Date(this.year, this.month, dateNum)
      const taskCount = this.getTaskCountByDate(dateObj)
      const color = this.getColorByTaskCount(taskCount)
      return color
    },
    getColorByTaskCount (count) {
      const { heatmapColorConfig } = this
      if (!Array.isArray(heatmapColorConfig) || !heatmapColorConfig.length) {
        return this.defaultColor
      }

      let color
      for (let i = 0, len = heatmapColorConfig.length; i < len; i++) {
        const minTask = heatmapColorConfig[i][0]
        const maxTask = i < len - 1
          ? heatmapColorConfig[i + 1][0]
          : Number.MAX_SAFE_INTEGER

        if (count >= minTask && count < maxTask) {
          color = heatmapColorConfig[i][1]
          break
        }
      }
      return color || this.defaultColor
    }
  }
}
</script>

<style lang="scss" scoped>
.heatmap-month-block {
  @apply inline-flex flex-col justify-between items-stretch;

  &__day-blocks-wrapper {
    display: inline;
  }

  &__day-block {
    transform-origin: 0 0;
    @apply border-none bg-transparent;

    > rect {
      transform-origin: 0 0;
      cursor: pointer;
      @apply border-none stroke-0;

      &:hover {
        stroke: rgba(69,90,100,1);
        stroke-width: 1px;
      }
    }
  }

  &__month-name {
    @apply block mt-2
    tracking-wide
    uppercase
    text-left text-xs
    text-gray-500;
  }
}
</style>
