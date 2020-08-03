<template>
  <div class="mb-8">
    <div class="p-4 border border-solid border-gray-300 rounded">
      <header class="flex justify-between items-center">
        <h5 class="font-bold text-gray-700 text-sm">
          Filter Tanggal
        </h5>
        <span class="text-xs text-blue-500 font-bold cursor-pointer" @click="onReset">
          RESET
        </span>
      </header>
      <br/>
      <div class="flex justify-between items-stretch">
        <InputText
          name="startDate"
          type="text"
          title="Awal"
          :value="startDateText"
          :disabled="true"
          @click.native.capture="showModal = true"
        >
          <template #title>
            <span class="text-xs text-gray-600">
              Mulai
            </span>
          </template>
        </InputText>
        <span class="w-8">
        </span>
        <InputText
          name="startDate"
          type="text"
          title="Akhir"
          :value="endDateText"
          :disabled="true"
          @click.native.capture="showModal = true"
        >
          <template #title>
            <span class="text-xs text-gray-600">
              Akhir
            </span>
          </template>
        </InputText>
      </div>
      <div class="date-range-picker__helpers">
        <button
          v-for="(h, index) in pickerHelpers"
          :key="index"
          :class="[isHelperSelected(h) && 'is-active']"
          @click="onHelperClick(h)">
          {{ h.label }}
        </button>
      </div>
    </div>
    <div :class="['date-range-picker__modal', showModal && 'is-active']">
      <div class="p-4 rounded-lg bg-white shadow-lg">
        <h5 class="font-bold text-gray-700 mb-4">
          Filter Tanggal
        </h5>
        <VDatePicker
          v-if="showModal"
          ref="rangeDatePicker"
          mode="range"
          :value="rangeOfDateValue"
          :is-inline="true"
        />
        <div class="flex justify-end items-center mt-4">
          <button
            class="date-range-picker__btn bg-gray-500 border-gray-500"
            @click="onCancelSelection">
            Batal
          </button>
          <button
            class="date-range-picker__btn bg-green-600 border-green-500"
            @click="onConfirmSelection">
            Pilih
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VDatePicker from 'v-calendar/lib/components/date-picker.umd'
import { format, subDays, setDate, getDaysInMonth, isEqual } from 'date-fns'
// import InputSelect from '../Form/Select'
import InputText from '../Form/Input'

const formatDateToYMD = (date) => format(date, 'yyyy-MM-dd')

const DATE_OPTION = {
  TODAY: 'TODAY',
  THIS_WEEK: 'THIS_WEEK',
  THIS_MONTH: 'THIS_MONTH',
  CUSTOM_RANGE: 'CUSTOM_RANGE'
}

export default {
  components: {
    InputText,
    // InputSelect,
    VDatePicker
  },
  data () {
    return {
      showModal: false,
      rangeOfDateValue: {
        start: null,
        end: null
      },
      selectedDateOption: DATE_OPTION.THIS_MONTH,
      pickerHelpers: [
        { label: 'Hari ini', value: { start: new Date(), end: new Date() } },
        { label: 'Minggu ini', value: { start: new Date(), end: subDays(new Date(), 7) } },
        { label: 'Bulan ini', value: { start: setDate(new Date(), 1), end: setDate(new Date(), getDaysInMonth(new Date())) } }
      ]
    }
  },
  computed: {
    startDateText () {
      return this.rangeOfDateValue.start ? formatDateToYMD(this.rangeOfDateValue.start) : '-'
    },
    endDateText () {
      return this.rangeOfDateValue.end ? formatDateToYMD(this.rangeOfDateValue.end) : '-'
    }
  },
  methods: {
    onReset () {
      this.rangeOfDateValue = {
        start: null,
        end: null
      }
      this.performFilter()
    },
    isHelperSelected (helper) {
      const { value: { start, end } } = helper
      return isEqual(start, this.rangeOfDateValue.start) &&
        isEqual(end, this.rangeOfDateValue.end)
    },
    onHelperClick (helper) {
      this.rangeOfDateValue = helper.value
      this.performFilter(helper.value)
    },
    onCancelSelection () {
      this.showModal = false
    },
    onConfirmSelection () {
      const { start, end } = this.$refs.rangeDatePicker.value_
      this.singleDateValue = null
      this.rangeOfDateValue = { start, end }
      this.performFilter(this.rangeOfDateValue)
      this.$nextTick(() => {
        this.showModal = false
      })
    },
    performFilter ({ start, end } = {}) {
      const params = {}
      if (start instanceof Date || end instanceof Date) {
        Object.assign(params, {
          start_date: formatDateToYMD(start),
          end_date: formatDateToYMD(end)
        })
      }
      this.$store.dispatch('logbook-list/getLogbookList', params)
    }
  }
}
</script>

<style lang="scss" scoped>
.date-range-picker__modal {
  backdrop-filter: blur(4px);
  background-color: rgba(0,0,0,0.1);
  @apply z-50 fixed inset-0
  hidden select-none
  flex-col flex-no-wrap
  justify-center items-center;

  &.is-active {
    @apply flex self-auto;
  }
}

.date-range-picker__btn {
  @apply px-4 py-2 rounded
  border border-solid text-white;

  & + & {
    @apply ml-4;
  }

  &:hover {
    @apply opacity-50;
  }
}

.date-range-picker__helpers {
  @apply mt-2;
  > button {
    @apply px-3 py-1 rounded-full
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
