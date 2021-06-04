<template>
  <div class="table-filter">
    <DateRangePicker
      :range="dateRange"
      @change-date="onDateChanged"
    />
    <span class="w-4" />
    <InputSelect
      title="Item per Halaman"
      :options="perPageOptions"
      :value="filter.perPage"
      prompt="Jumlah item"
      style="width: 120px;"
      @change="onPerPageChanged"
    >
      <template #title>
        <span class="text-xs text-gray-600">
          Item per Halaman
        </span>
      </template>
    </InputSelect>
    <span class="w-4" />
    <button
      class="table-filter__btn-reset"
      :disabled="!canReset"
      @click="onReset"
    >
      Reset
    </button>
  </div>
</template>

<script>
import _isEqual from 'lodash/isEqual'
import DateRangePicker from './date-range-picker.vue'
import InputSelect from '../Form/Select'

const defaultFilter = {
  startDate: null,
  endDate: null,
  perPage: 10
}

export default {
  components: {
    DateRangePicker,
    InputSelect
  },
  props: {
    filter: {
      type: Object,
      default: () => defaultFilter
    }
  },
  data () {
    return {
      perPageOptions: [5, 10, 20]
    }
  },
  computed: {
    dateRange () {
      const { startDate, endDate } = this.filter
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate) : null
      return {
        start,
        end
      }
    },
    canReset () {
      return !_isEqual(defaultFilter, this.filter)
    }
  },
  methods: {
    onDateChanged ({ start_date: startDate, end_date: endDate }) {
      this.$emit('change', {
        ...this.filter,
        startDate,
        endDate
      })
    },
    onPerPageChanged (perPage) {
      this.$emit('change', {
        ...this.filter,
        perPage
      })
    },
    onReset () {
      this.$emit('change', { ...defaultFilter })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-filter {
  @apply flex justify-start items-start;

  &__btn-reset {
    @apply mt-6 px-4 py-3
    flex justify-center items-center
    rounded
    bg-white
    border border-blue-500
    text-blue-500
    leading-5;

    &:focus {
      @apply outline-none;
    }

    &:active {
      @apply bg-blue-400;
    }

    &:disabled {
      @apply cursor-not-allowed
      text-gray-500
      bg-gray-300 border-gray-500
      opacity-50;
    }
  }
}
</style>
