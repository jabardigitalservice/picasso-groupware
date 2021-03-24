<template>
  <div class="datatable">
    <div class="datatable-pagination__container">
      <VPagination v-bind="paginationProps" />
    </div>
    <header class="mb-4 flex justify-between items-center">
      <p class="text-sm text-gray-600">
        <template v-if="pagination.totalCount">
          Menampilkan {{ startIndex + 1 }} - {{ endIndex + 1 }} dari total {{ pagination.totalCount }} data
        </template>
      </p>
      <slot name="actions"></slot>
    </header>
    <div class="flex justify-center overflow-x-auto overflow-y-hidden">
      <table
        class="datatable__table"
        :aria-describedby="description">
        <thead>
          <tr>
            <th>No.</th>
            <th v-for="(column, columnIndex) in columns" :key="columnIndex">
              <slot :name="`header-${column.prop}`">
                {{ column.label }}
              </slot>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="isLoading">
            <tr v-for="i in pagination.perPage" :key="`skeleton:${i}`">
              <td v-for="j in columns.length + 1" :key="`col:${j}`" class="p-4">
                <div class="w-full h-2 rounded-full bg-shimmering" />
              </td>
            </tr>
          </template>
          <template v-else-if="!data || !data.length">
            <tr>
              <td :colspan="columns.length + 1">
                <div class="p-4 text-center font-bold text-gray-400 bg-gray-200 uppercase">
                  Tidak ada data
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              v-for="(row, rowIndex) in data"
              :key="rowIndex">
              <slot name="row">
                <td>
                  {{ getAbsoluteIndex(rowIndex) }}
                </td>
                <td v-for="(column, columnIndex) in columns" :key="columnIndex">
                  <slot :name="`column-${column.prop}`" v-bind="{ row, rowIndex, column, columnIndex }">
                    {{ getCellValue(row, rowIndex, column, columnIndex) }}
                  </slot>
                </td>
              </slot>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _get from 'lodash/get'
import VPagination from 'vuejs-paginate'

export default {
  name: 'LogbookTable',
  components: {
    VPagination
  },
  props: {
    description: {
      type: String,
      default: 'Data Table'
    },
    pagination: {
      type: Object,
      validator: (obj) => {
        return obj && typeof obj === 'object' &&
          ['page', 'perPage', 'totalPages', 'totalCount'].every((key) => key in obj)
      },
      default: () => ({
        page: 1,
        perPage: 10,
        totalPages: 0,
        totalCount: 0
      })
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    error: {
      type: [String, Object],
      default: null
    }
  },
  computed: {
    startIndex () {
      const { page, perPage } = this.pagination
      return (page - 1) * (perPage)
    },
    endIndex () {
      const { page, totalCount, perPage } = this.pagination
      if (page === Math.ceil(totalCount / perPage)) {
        return totalCount - 1
      } else {
        return this.startIndex + this.data.length - 1
      }
    },
    paginationProps () {
      return {
        value: this.pagination.page,
        pageCount: this.pagination.totalPages,
        pageRange: 3,
        containerClass: 'datatable-pagination',
        pageClass: 'datatable-pagination__page',
        prevText: 'Prev',
        nextText: 'Next',
        prevClass: 'datatable-pagination__page datatable-pagination__page--prev',
        nextClass: 'datatable-pagination__page datatable-pagination__page--next',
        clickHandler: this.onPageChanged
      }
    }
  },
  methods: {
    getAbsoluteIndex (rowIndex) {
      if (typeof this.startIndex === 'number') {
        return this.startIndex + rowIndex + 1
      }
    },
    getCellValue (row, rowIndex, column, columnIndex) {
      if (typeof column.get === 'function') {
        return column.get({
          row,
          rowIndex,
          column,
          columnIndex
        })
      }
      if (typeof column.prop === 'string') {
        return _get(row, column.prop)
      }
      return ''
    },
    onPageChanged (page) {
      this.$emit('change:page', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.datatable__table {
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

  tbody > tr {
    > td {
      @apply p-4 text-left
      border-b border-solid border-gray-300;
    }
  }
}

</style>

<style lang="scss">
.datatable-pagination__container {
  @apply rounded border border-solid border-gray-300
  p-4 mb-4 -mt-4;
}

.datatable-pagination {
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

.datatable-pagination__page {
  &--prev,
  &--next {
    @apply border border-solid border-gray-300
    text-blue-500 font-bold;
  }
}
</style>
