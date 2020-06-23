<template>
  <div>
    <template v-if="isLoadingLogbookList">

    </template>
    <template v-else-if="logbookListError">

    </template>
    <template v-else-if="logbookListData">
      <header class="mb-12 flex justify-between items-center">
        <p class="text-sm text-gray-600">
          Menampilkan {{ startIndex + 1 }} - {{ endIndex + 1 }} dari total {{ totalCount }} data
        </p>
      </header>
      <ul class="logbook-cards">
        <CardListItem
          v-for="(data, index) in logbookListData"
          :key="index"
          tag="li"
          class="mb-6"
          :logbook="data"
          :index="getAbsoluteIndex(index)"/>
      </ul>
    </template>
  </div>
</template>

<script>
import listMixin from './list-mixin'
import CardListItem from './card-list-item'
export default {
  name: 'LogbookCardList',
  mixins: [listMixin],
  components: {
    CardListItem
  }
}
</script>

<style lang="scss" scoped>
.logbook-cards {
  @apply list-none;
}
</style>
