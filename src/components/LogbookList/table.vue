<template>
  <div>
    <template v-if="isLoadingLogbookList">

    </template>
    <template v-else-if="logbookListError">

    </template>
    <template v-else-if="logbookListData">
      <DateRangePicker/>
      <header class="mb-8 flex justify-between items-center">
        <p class="text-sm text-gray-600">
          Menampilkan {{ startIndex + 1 }} - {{ endIndex + 1 }} dari total {{ totalCount }} data
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
            <template v-if="!logbookListData || !logbookListData.length">
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
                :index="getAbsoluteIndex(index)">
              </TableRow>
            </template>
          </tbody>
      </table>
    </div>
    </template>
  </div>
</template>

<script>
import listMixin from './list-mixin'
import DateRangePicker from './date-range-picker.vue'
import TableRow from './table-row'
export default {
  name: 'LogbookTable',
  mixins: [listMixin],
  components: {
    TableRow,
    DateRangePicker
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
