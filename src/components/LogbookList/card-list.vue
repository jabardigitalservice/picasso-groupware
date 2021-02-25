<template>
  <div>
    <DateRangePicker @change-date="onDateChanged"/>
    <LazyListDataProvider
      ref="dataProvider"
      :immediate="true"
      :data-source="getDataSource"
      :per-page="perPage"
    >
      <template #default="{ data: logbookListData }">
        <ul
          v-if="logbookListData.length"
          class="logbook-cards">
          <CardListItem
            v-for="(data, index) in logbookListData"
            :key="index"
            tag="li"
            class="mb-6"
            :logbook="data"
            :index="getAbsoluteIndex(index)"
            @delete:success="onRefreshList"/>
        </ul>
      </template>
      <template #pending>
        <CardListItemSkeleton class="my-2" />
      </template>
      <template #error="{message}">
        <p>
          {{ message }}
        </p>
      </template>
      <template #end="{hasNoData, hasAtLeastOneData}">
        <p class="p-6 rounded text-gray-600 text-center bg-gray-200">
          <template v-if="hasNoData">
            Data Tidak Tersedia
          </template>
          <template v-else-if="hasAtLeastOneData">
            Akhir Dari Data
          </template>
        </p>
      </template>
    </LazyListDataProvider>
    <div
      class="fixed left-0 right-0 w-full flex justify-center items-center"
      style="bottom: 5rem;">
      <button
        class="floating-action-button bg-blue-500"
        @click="onCreateNewLogbook">
        + Buat Laporan Baru
      </button>
    </div>
  </div>
</template>

<script>
import LazyListDataProvider from '../LazyListDataProvider'
import listMixin from './list-mixin'
import DateRangePicker from './date-range-picker.vue'
import CardListItem from './card-list-item'
import CardListItemSkeleton from './card-list-item-skeleton.vue'

export default {
  name: 'LogbookCardList',
  mixins: [listMixin],
  components: {
    LazyListDataProvider,
    DateRangePicker,
    CardListItem,
    CardListItemSkeleton
  },
  data () {
    return {
      page: 1,
      perPage: 10,
      totalPage: 0,
      totalCount: 0,
      startDate: null,
      endDate: null,
      startIndex: 0
    }
  },
  methods: {
    onDateChanged ({ start_date: startDate, end_date: endDate }) {
      this.startDate = startDate
      this.endDate = endDate
      this.$refs.dataProvider.refresh()
    },
    async onRefreshList () {
      this.$refs.dataProvider.refresh()
    },
    getDataSource ({ currentPage, perPage }) {
      return this.$store.dispatch('logbook-list/getLogbookList', {
        page: currentPage,
        pageSize: perPage,
        start_date: this.startDate,
        end_date: this.endDate
      }).then(({ results, _meta }) => {
        const { currentPage, perPage, totalPage, totalCount } = _meta
        this.page = currentPage
        this.perPage = perPage
        this.totalPage = totalPage
        this.totalCount = totalCount
        return results
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logbook-cards {
  @apply list-none;
}

.floating-action-button {
  @apply
  px-4 py-2 rounded-full
  text-white
  shadow-xl;

  &:focus,
  &:hover {
    @apply outline-none opacity-50;
  }
}
</style>
