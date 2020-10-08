<template>
  <div class="dayoff-card-list">
    <LazyListDataProvider
      ref="dataProvider"
      :immediate="true"
      :data-source="getDataSource"
      :per-page="perPage">
      <template #default="{ data: dayoffListData }">
        <div>
          <CardListItem
            v-for="(item, index) in dayoffListData"
            :key="index"
            :index="index"
            :item="item"
            class="mb-4" />
        </div>
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
        <p class="mt-4 p-6 rounded text-gray-600 text-center bg-gray-200">
          <template v-if="hasNoData">
            Data Tidak Tersedia
          </template>
          <template v-else-if="hasAtLeastOneData">
            Akhir Dari Data
          </template>
        </p>
      </template>
    </LazyListDataProvider>
  </div>
</template>

<script>
import LazyListDataProvider from '../../LazyListDataProvider'
import CardListItem from './card-list-item'
import CardListItemSkeleton from './card-list-item-skeleton'
export default {
  components: {
    LazyListDataProvider,
    CardListItem,
    CardListItemSkeleton
  },
  data () {
    return {
      perPage: 10
    }
  },
  methods: {
    getDataSource ({ currentPage }) {
      return this.$store.dispatch('dayoff-list/getDayoffList', {
        page: currentPage,
        perPage: this.perPage
      })
        .then(({ results }) => {
          return results
        })
    },
    getItemIndex () {

    }
  }
}
</script>

<style lang="scss" scoped>
.dayoff-card-list {
  //
}
</style>
