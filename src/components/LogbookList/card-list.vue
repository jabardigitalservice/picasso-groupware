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
