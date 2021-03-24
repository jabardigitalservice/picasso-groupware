<template>
  <DataTable
    description="Dayoff List"
    :is-loading="isLoading"
    :data="tableData"
    :error="error"
    :columns="tableColumns"
    :pagination="tablePagination"
    @change:page="onPageChanged">
    <template #actions>
      <div>
        <button class="dayoff-table__btn-create" @click="onGoToDayoffForm">
          Laporkan Izin
        </button>
      </div>
    </template>
    <template #column-permit_acknowledged="{ row, rowIndex }">
      <ul>
        <li
          v-for="(ack, index) in acknowledgementOptions"
          :key="index">
          <label :for="`row-${rowIndex}-permit_acknowledged`">
            <input
              type="checkbox"
              :checked="isAcknowledgementChecked(row, ack)"
              class="pointer-events-none">
            {{ ack }}
          </label>
        </li>
      </ul>
    </template>
    <template #column-file_url="{ row }">
      <img
        :src="row.file_url"
        class="dayoff-table__evidence">
    </template>
  </DataTable>
</template>

<script>
import DataTable from '../../DataTable'
import { formatDateLong } from '../../../lib/date'
import { STAKEHOLDER } from '../../../lib/constants'

const acknowledgementOptions = Object.freeze([
  STAKEHOLDER.STRUCTURAL,
  STAKEHOLDER.HR,
  STAKEHOLDER.COORDINATOR,
  STAKEHOLDER.WORK_PARTNER
])

const tableColumns = Object.freeze([
  {
    prop: 'permits_type',
    label: 'Jenis Izin'
  },
  {
    label: 'Dari',
    get: ({ row }) => {
      if (row.start_date) {
        return formatDateLong(new Date(row.start_date))
      }
      return '-'
    }
  },
  {
    label: 'Sampai',
    get: ({ row }) => {
      if (row.end_date) {
        return formatDateLong(new Date(row.end_date))
      }
      return '-'
    }
  },
  {
    prop: 'permit_acknowledged',
    label: 'Sudah Memberitahu'
  },
  {
    prop: 'note',
    label: 'Keterangan'
  },
  {
    prop: 'file_url',
    label: 'Evidence'
  }
])

export default {
  components: {
    DataTable
  },
  data () {
    return {
      acknowledgementOptions,
      tableColumns,
      page: 1,
      perPage: 10,
      totalPages: 0,
      totalCount: 0,
      tableData: [],
      isLoading: false,
      error: null
    }
  },
  computed: {
    tablePagination () {
      const { page, perPage, totalPages, totalCount } = this
      return {
        page,
        perPage,
        totalPages,
        totalCount
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    onPageChanged (newPage) {
      this.page = newPage
      this.loadData()
    },
    async loadData () {
      this.isLoading = true
      await this.$store.dispatch('dayoff-list/getDayoffList', {
        page: this.page,
        perPage: this.perPage
      })
        .then(({ results, _meta: meta }) => {
          this.tableData = results
          this.page = meta.currentPage
          this.perPage = meta.perPage
          this.totalCount = meta.totalCount
          this.totalPages = meta.totalPage
        }).catch((e) => {
          this.error = e
        })
      this.isLoading = false
    },
    isAcknowledgementChecked (row, acknowledgementType) {
      const arr = row.permit_acknowledged
      return Array.isArray(arr) && arr.includes(acknowledgementType)
    },
    onGoToDayoffForm () {
      this.$router.push({
        path: '/dayoff/create'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dayoff-table {
  &__evidence {
    @apply w-24 h-24 object-center object-cover
    border border-solid border-gray-300
    rounded-lg overflow-hidden;
  }
}

.dayoff-table__btn-create {
  @apply bg-blue-500 text-white
  px-4 py-2 w-full rounded;
}
</style>
