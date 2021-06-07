<template>
  <div class="date-range-picker__helpers">
    <button
      v-for="(h, index) in pickerHelpers"
      :key="index"
      :class="[isHelperSelected(h) && 'is-active']"
      @click="onHelperClick(h)"
    >
      {{ h.label }}
      <span
        v-show="isHelperSelected(h)"
        class="font-bold ml-2 leading-none"
      >
        ✕
      </span>
    </button>
  </div>
</template>

<script>
import { subDays, setDate, getDaysInMonth, isSameDay } from 'date-fns'

export default {
  props: {
    start: {
      type: [Number, Date],
      default: null
    },
    end: {
      type: [Number, Date],
      default: null
    }
  },
  data () {
    return {
      pickerHelpers: [
        { label: 'Hari ini', value: { start: new Date(), end: new Date() } },
        { label: 'Minggu ini', value: { start: subDays(new Date(), 7), end: new Date() } },
        { label: 'Bulan ini', value: { start: setDate(new Date(), 1), end: setDate(new Date(), getDaysInMonth(new Date())) } }
      ]
    }
  },
  methods: {
    isHelperSelected (helper) {
      const { value: { start, end } } = helper
      return isSameDay(start, this.start) &&
        isSameDay(end, this.end)
    },
    onHelperClick (helper) {
      if (this.isHelperSelected(helper)) {
        this.$emit('change', { start: null, end: null })
      } else {
        const { start, end } = helper.value
        this.$emit('change', { start, end })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.date-range-picker__helpers {
  @apply mt-2;
  > button {
    @apply px-3 py-1 rounded-full
    inline-flex items-center
    text-xs
    bg-blue-100 text-blue-500;

    &:focus,
    &:active {
      @apply outline-none;
    }

    &.is-active {
      @apply bg-blue-500 text-white;
    }
  }

  > button + button {
    @apply ml-2;
  }
}
</style>
