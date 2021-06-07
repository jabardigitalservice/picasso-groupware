<template>
  <div>
    <TableFilter
      class="mb-8"
      :filter="tableFilter"
      @change="onFilterChanged"
    />
    <header class="mb-4 flex justify-between items-center">
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
    <div class="overflow-x-auto overflow-y-hidden">
      <table class="logbook-table">
        <thead>
          <tr>
            <th style="width: 1%;">No.</th>
            <th style="width: 1%;">Tanggal</th>
            <th style="width: 1%;">Project</th>
            <th style="width: 50%;">Task</th>
            <th style="width: 1%;">Tupoksi</th>
            <th style="width: 1%;">Foto Kegiatan</th>
            <th style="width: 1%;">Lampiran</th>
            <th style="width: 1%;">Action</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="isLoadingLogbookList">
            <tr v-for="i in mQuery.perPage" :key="`skeleton:${i}`">
              <td v-for="j in 8" :key="`col:${j}`" class="p-4">
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
    <div class="v-pagination-container mt-4">
      <Pagination v-bind="pagination" />
    </div>
  </div>
</template>

<script>
import Pagination from '../Pagination'
import listMixin from './list-mixin'
import TableFilter from './table-filter'
import TableRow from './table-row'
import _isEqual from 'lodash/isEqual'

export default {
  name: 'LogbookTable',
  mixins: [listMixin],
  components: {
    Pagination,
    TableFilter,
    TableRow
  },
  props: {
    query: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      isLoadingLogbookList: true,
      logbookListError: null,
      logbookListData: null,
      totalPage: 0,
      totalCount: 0,

      mQuery: {
        page: 1,
        perPage: 10,
        startDate: null,
        endDate: null
      }
    }
  },
  computed: {
    tableFilter () {
      return {
        startDate: this.mQuery.startDate,
        endDate: this.mQuery.endDate,
        perPage: this.mQuery.perPage
      }
    },
    startIndex () {
      if (this.totalCount) {
        return (this.mQuery.page - 1) * (this.mQuery.perPage)
      }
      return 0
    },
    endIndex () {
      if (this.totalCount) {
        if (this.mQuery.page === Math.ceil(this.totalCount / this.mQuery.perPage)) {
          return this.totalCount - 1
        } else {
          return this.startIndex + this.logbookListData.length - 1
        }
      }
      return 0
    },
    pagination () {
      return {
        value: this.mQuery.page,
        pageCount: this.totalPage,
        pageRange: 3,
        clickHandler: this.onPageChanged,
        firstLastButton: true
      }
    }
  },
  watch: {
    query: {
      immediate: true,
      deep: true,
      handler (newObject, oldObject) {
        if (_isEqual(newObject, oldObject)) {
          return
        }

        const {
          page = 1,
          perPage = 10,
          startDate = null,
          endDate = null
        } = (newObject || {})
        this.updateQuery({
          page,
          perPage,
          startDate,
          endDate
        }, {
          sync: false
        })
      }
    }
  },
  methods: {
    updateQuery ({
      page,
      perPage,
      startDate,
      endDate
    }, {
      sync = true
    } = {}) {
      this.mQuery = {
        page,
        perPage,
        startDate,
        endDate
      }
      if (sync) {
        this.$emit('update:query', this.mQuery)
      } else {
        this.loadData()
      }
    },
    getQueryAsAPISpec () {
      const { page, perPage, startDate, endDate } = this.mQuery
      return {
        page,
        pageSize: perPage,
        start_date: startDate,
        end_date: endDate
      }
    },
    onFilterChanged ({ startDate, endDate, perPage } = {}) {
      this.updateQuery({
        page: 1,
        startDate,
        endDate,
        perPage
      })
      this.totalCount = 0
      this.totalPage = 0
    },
    onPageChanged (newPage) {
      this.updateQuery({
        ...this.mQuery,
        page: newPage
      })
    },
    onLoadSuccess ({ results, _meta }) {
      const { totalPage, totalCount } = _meta
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

      const params = this.getQueryAsAPISpec()
      this.$store.dispatch('logbook-list/getLogbookList', params)
        .then(this.onLoadSuccess)
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
    vertical-align: top;
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
