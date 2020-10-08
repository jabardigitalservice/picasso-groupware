<template>
  <div v-once class="card-list-item-skeleton">
    <div class="flex-1">
      <div class="w-full flex justify-between items-center">
        <p class="block w-1/2 h-3 mb-2 rounded-full bg-shimmering" />
        <i class="flex-1" />
        <i class="ml-2 flex-none inline-block w-8 h-8 rounded bg-shimmering" />
        <i class="ml-2 flex-none inline-block w-8 h-8 rounded bg-shimmering" />
        <i class="ml-2 flex-none inline-block w-8 h-8 rounded bg-shimmering" />
      </div>
      <p class="block w-1/3 h-3 mb-2 rounded-full bg-shimmering" />
      <br />
      <p class="block w-full h-3 mb-2 rounded-full bg-shimmering" />
      <p class="block w-2/3 h-3 mb-2 rounded-full bg-shimmering" />
      <p class="block w-2/3 h-3 mb-2 rounded-full bg-shimmering" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-list-item-skeleton {
  @apply cursor-pointer
  p-5
  flex flex-row justify-start items-start
  border border-solid border-gray-300
  rounded;

  &:hover {
    @apply bg-gray-100;
  }
}

</style>
