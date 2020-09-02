<template>
  <div>
    <DateRangePicker @change-date="onDateChanged"/>
      <div class="v-pagination-container">
        <VPagination v-bind="pagination" />
      </div>
      <header class="mb-8 flex justify-between items-center">
        <p class="text-sm text-gray-600">
          <template v-if="totalCount">
            Menampilkan {{ startIndex + 1 }} - {{ endIndex + 1 }} dari total {{ totalCount }} data
          </template>
        </p>
        <p>
          <button
            class="header-action-button bg-blue-500"
            @click="onCreateNewLogbook">
            + Buat Laporan Baru
          </button>
        </p>
      </header>
      <div class="flex justify-center overflow-x-auto overflow-y-hidden">
        <table class="logbook-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Proyek</th>
              <th>Tanggal dan Jam</th>
              <th>Tugas</th>
              <th>Evidence</th>
              <th>Dokumen Lainnya</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="isLoadingLogbookList">
              <tr v-for="i in perPage" :key="`skeleton:${i}`">
                <td v-for="j in 7" :key="`col:${j}`" class="p-4">
                  <div class="w-full h-2 rounded-full bg-shimmering" />
                </td>
              </tr>
            </template>
            <template v-else-if="!logbookListData || !logbookListData.length">
              <tr>
                <td colspan="7">
                  <div class="p-4 text-center font-bold text-gray-400 bg-gray-200 uppercase">
                    Tidak ada data
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <TableRow
                v-for="(data, index) in logbookListData"
                :key="index"
                :logbook="data"
                :index="getAbsoluteIndex(index)"
                @delete:success="loadData">
              </TableRow>
            </template>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import VPagination from 'vuejs-paginate'
import listMixin from './list-mixin'
import DateRangePicker from './date-range-picker.vue'
import TableRow from './table-row'

export default {
  name: 'LogbookTable',
  mixins: [listMixin],
  components: {
    VPagination,
    TableRow,
    DateRangePicker
  },
  data () {
    return {
      isLoadingLogbookList: true,
      logbookListError: null,
      logbookListData: null,
      totalPage: 0,
      totalCount: 0,
      page: 1,
      perPage: 10,
      startDate: null,
      endDate: null
    }
  },
  computed: {
    startIndex () {
      if (this.totalCount) {
        return (this.page - 1) * (this.perPage)
      }
      return 0
    },
    endIndex () {
      if (this.totalCount) {
        if (this.page === Math.ceil(this.totalCount / this.perPage)) {
          return this.totalCount - 1
        } else {
          return this.startIndex + this.logbookListData.length - 1
        }
      }
      return 0
    },
    pagination () {
      return {
        value: this.page,
        pageCount: this.totalPage,
        pageRange: 3,
        containerClass: 'v-pagination',
        pageClass: 'v-pagination__page',
        prevText: 'Prev',
        nextText: 'Next',
        prevClass: 'v-pagination__page v-pagination__page--prev',
        nextClass: 'v-pagination__page v-pagination__page--next',
        clickHandler: this.onPageChanged
      }
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    onDateChanged ({ start_date: startDate, end_date: endDate }) {
      this.page = 1
      this.totalCount = 0
      this.totalPage = 0
      this.startDate = startDate
      this.endDate = endDate
      this.loadData()
    },
    onPageChanged (newPage) {
      this.page = newPage
      this.loadData()
    },
    onLoadSuccess ({ results, _meta }) {
      const { currentPage, perPage, totalPage, totalCount } = _meta
      this.page = currentPage
      this.perPage = perPage
      this.totalPage = totalPage
      this.totalCount = totalCount
      this.logbookListData = results
    },
    onLoadError (err) {
      this.logbookListError = err
    },
    onLoadFinished () {
      this.isLoadingLogbookList = false
    },
    loadData () {
      this.isLoadingLogbookList = true
      this.logbookListError = null

      this.$store.dispatch('logbook-list/getLogbookList', {
        page: this.page,
        pageSize: this.perPage,
        start_date: this.startDate,
        end_date: this.endDate
      }).then(this.onLoadSuccess)
        .catch(this.onLoadError)
        .finally(this.onLoadFinished)
    }
  }
}
</script>

<style lang="scss" scoped>
.logbook-table {
  @apply w-full text-sm select-text overflow-auto;

  th {
    vertical-align: middle;
    &:not([class*="px-0"]) {
      @apply px-4;
    }
    &:not([class*="py-0"]) {
      @apply py-2;
    }
  }

  th {
    @apply border-t-2 border-b-2
    border-solid border-gray-300
    text-left
    text-gray-600
    text-xs
    uppercase tracking-wider;
  }
}

.header-action-button {
  @apply h-8 mx-1 px-3 py-1 rounded text-white;

  > *[class*="fa-"] {
    @apply mr-1;
  }

  &:hover,
  &:focus {
    @apply outline-none opacity-50;
  }
}
</style>

<style lang="scss">
.v-pagination-container {
  @apply rounded border border-solid border-gray-300
  p-4 mb-4 -mt-4;
}

.v-pagination {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &__page {
    background-color: #eee;
    @apply cursor-pointer
    inline-block
    rounded
    bg-white
    leading-none;

    &:not(.disabled):not(.active):hover {
      opacity: 0.5;
    }

    &.active {
      @apply bg-blue-500 text-white;
    }

    &.disabled {
      @apply cursor-not-allowed opacity-50;
    }

    & + & {
      margin-left: 0.5rem;
    }

    > a {
      padding: 0.5rem 0.75rem;
      cursor: inherit;
      @apply block w-full h-full text-sm;

      &:focus,
      &:active {
        outline: none;
        border: none;
      }
    }
  }
}

.v-pagination__page {
  &--prev,
  &--next {
    @apply border border-solid border-gray-300
    text-blue-500 font-bold;
  }
}
</style>
