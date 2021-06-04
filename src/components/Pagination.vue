<template>
  <div class="v-pagination">
    <VPagination
      v-bind="paginationProps"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import VPagination from 'vuejs-paginate'
export default {
  extends: VPagination,
  components: {
    VPagination
  },
  computed: {
    paginationProps () {
      return {
        ...this.$props,
        containerClass: 'v-pagination',
        pageClass: 'v-pagination__page',
        prevText: 'Prev',
        nextText: 'Next',
        prevClass: 'v-pagination__page v-pagination__page--prev',
        nextClass: 'v-pagination__page v-pagination__page--next'
      }
    }
  }
}
</script>

<style lang="scss">

.v-pagination-container {
  @apply rounded border border-solid border-gray-300
  p-4 mb-4;
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

    & + & {
      margin-left: 0.5rem;
    }

    &--prev,
    &--next {
      @apply border border-solid border-gray-300
      text-blue-500 font-bold;
    }

    &:first-child,
    &:last-child {
      @apply text-blue-500 font-bold;
    }

    &:not(.disabled):not(.active):hover {
      opacity: 0.5;
    }

    &.active {
      @apply bg-blue-500 text-white;
    }

    &.disabled {
      @apply cursor-not-allowed opacity-50;
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
</style>
