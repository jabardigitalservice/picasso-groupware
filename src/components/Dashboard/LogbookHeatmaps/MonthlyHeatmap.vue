<template>
  <div class="monthly-heatmap">
    <span
      class="monthly-heatmap__month-name">
      {{ monthName }}
    </span>
    <svg
      :viewBox="viewBoxRectSize"
      class="monthly-heatmap__blocks"
      :key="`${year}/${month}`">
      <g v-for="dayIndex in 7"
        :key="`day:${dayIndex}`"
        class="monthly-heatmap__block"
        fill="transparent"
      >
        <rect
          :width="rectSize"
          :height="rectSize"
          :x="getRectX(dayIndex - 1)"
          :y="getRectY(dayIndex - 1)"
        />
        <text
          :x="getDayNameTextX(dayIndex - 1)"
          :y="getDayNameTextY(dayIndex - 1)"
          fill="#bbb"
          style="font: bold 20px sans-serif; text-transform: uppercase;"
        >
          {{ getDayName(dayIndex) }}
        </text>
      </g>
      <g
        v-for="(dateNum, index) in numOfDays"
        :key="dateNum"
        class="monthly-heatmap__block"
        fill="transparent">
        <rect
          :key="`rect:${index}`"
          :class="{
            'monthly-heatmap__block__rect': true,
            'is-loading': isLoading
          }"
          :style="{
            fill: getHeatColorByDateNum(dateNum),
            animationDelay: `${randomizeDelay(index)}ms`
          }"
          :width="rectSize"
          :height="rectSize"
          :rx="rectSize / 10"
          :ry="rectSize / 10"
          :x="getRectX(7 + index + startOfMonthOffsetInDays)"
          :y="getRectY(index + startOfMonthOffsetInDays)" />
        <title>
          {{ getTooltipContentByDateNum(dateNum) }}
        </title>
      </g>
    </svg>
  </div>
</template>

<script>
import isValid from 'date-fns/isValid'
import formatDate from 'date-fns/format'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import differenceInDays from 'date-fns/differenceInDays'
import startOfWeek from 'date-fns/startOfWeek'
import getWeeksInMonth from 'date-fns/getWeeksInMonth'
import isWeekend from 'date-fns/isWeekend'
import id from 'date-fns/locale/id'

import { formatDateShort } from '../../../lib/date'
import { mapGetters, mapState } from 'vuex'

export default {
  inject: {
    heatmapColorConfig: {
      from: 'heatmapColorConfig',
      default: () => []
    }
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    month: {
      type: Number
    },
    year: {
      type: Number
    }
  },
  data () {
    return {
      rectGap: 6,
      rectSize: 60,
      defaultColor: '#ECEFF1'
    }
  },
  computed: {
    isMonthAndYearDefined () {
      const { month, year } = this
      const isNumber = typeof month === 'number' && typeof year === 'number'
      const isValidDate = isValid(new Date(year, month))
      return isNumber && isValidDate
    },
    ...mapGetters('logbook-heatmap', [
      'getTaskCountByDate'
    ]),
    ...mapState('logbook-heatmap', {
      heatmapData (state) {
        if (!this.isMonthAndYearDefined) {
          return null
        }
        const key = `${parseInt(this.year)}/${parseInt(this.month)}`
        return state.dataByMonthYear[key] || null
      }
    }),
    startOfMonthOffsetInDays () {
      if (!this.isMonthAndYearDefined) {
        return 0
      }
      const monthStart = new Date(this.year, this.month, 1)
      const calendarStart = startOfWeek(monthStart, {
        weekStartsOn: 1
      })
      return differenceInDays(monthStart, calendarStart)
    },
    numOfWeeks () {
      if (!this.isMonthAndYearDefined) {
        return 0
      }
      return getWeeksInMonth(new Date(this.year, this.month))
    },
    numOfDays () {
      if (!this.isMonthAndYearDefined) {
        return 0
      }
      return getDaysInMonth(new Date(this.year, this.month))
    },

    viewBoxRectSize () {
      // 7 is maximum num of weeks in month (6) + 1 column for day name
      const maxNumOfColumns = 7
      const width = (this.rectSize * maxNumOfColumns) + (this.rectGap * (maxNumOfColumns + 1))

      // 7 is number of days within week
      // 8 is number of gap for 7 rows
      const height = (this.rectSize * 7) + (this.rectGap * 8)
      return `0 0 ${width} ${height}`
    },
    monthName () {
      return formatDate(new Date(this.year, this.month), 'MMMM', {
        locale: id
      })
    }
  },
  methods: {
    getDayName (dayIndex) {
      // monday is zero in date-fns
      const i = dayIndex === 7 ? 0 : dayIndex
      return id.localize.day(i, {
        width: 'short'
      })
    },
    getDayNameTextY (dayIndex) {
      const rectY = this.getRectY(dayIndex)
      // 10 is half of font size
      return 10 + rectY + Math.floor(this.rectSize / 2)
    },
    getDayNameTextX (dayIndex) {
      return 0
    },
    getRectY (itemIndex) {
      return this.rectGap + ((itemIndex % 7)) * (this.rectSize + this.rectGap)
    },
    getRectX (itemIndex) {
      const colNum = Math.floor(itemIndex / 7)
      return this.rectGap + (colNum * (this.rectSize + this.rectGap))
    },

    getTooltipContentByDateNum (dateNum) {
      const dateObj = new Date(this.year, this.month, dateNum)
      const dateString = formatDateShort(dateObj)

      const taskCount = this.getTaskCountByDate(dateObj)
      if (taskCount > 0) {
        return `${taskCount} laporan pada ${dateString}`
      }

      if (isWeekend(dateObj)) {
        return dateString
      }
      return `Belum ada laporan pada ${dateString}`
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
    },
    randomizeDelay () {
      return (Math.random() ** 4) * 5000
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes rotatingRect {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.monthly-heatmap {
  max-width: 200px;
  @apply inline-flex flex-col justify-between items-stretch;

  &__blocks {
    display: inline;
    @apply w-full;
  }

  &__block {
    transform-origin: 0 0;
    @apply border-none bg-transparent;

    &__rect {
      transform-origin: center;
      transform-box: fill-box;
      cursor: pointer;
      @apply border-none stroke-0;

      &:hover {
        stroke: rgb(0, 0, 0, 0.2);
        stroke-width: 6;
      }

      &.is-loading {
        animation: rotatingRect 1s infinite alternate ease-out;
      }
    }
  }

  &__month-name {
    @apply block mb-2
    text-left text-sm
    text-green-600 font-bold;
  }
}
</style>
