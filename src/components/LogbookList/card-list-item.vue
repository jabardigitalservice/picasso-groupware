<template>
  <component :is="tag" class="logbook-cards__card">
    <div class="logbook-cards__card__main">
      <div class="logbook-cards__card__header">
        <i class="block w-16 h-2 rounded-full bg-brand-green"></i>
        <div class="whitespace-no-wrap">
          <p class="text-xs">
            <button
              class="action-button text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500"
              @click="onOpenLogbookDetail">
              <i class="fa fa-eye"></i>
              <span class="hidden sm:inline-block">
                Detail
              </span>
            </button>
            <button
              class="action-button text-green-500 border-green-500 hover:text-white hover:bg-green-500"
              @click="onEditLogbook">
              <i class="fa fa-pencil-alt"></i>
              <span class="hidden sm:inline-block">
                Edit
              </span>
            </button>
            <button
              class="action-button text-red-500 border-red-500 hover:text-white hover:bg-red-500"
              @click="beforeDeleteLogbook">
              <i class="fa fa-trash"></i>
              <span class="hidden sm:inline-block">
                Delete
              </span>
            </button>
          </p>
        </div>
        <div class="w-full flex-none">
          <h3 class="logbook-cards__card__project-name">
            {{ logbook.projectName }}
          </h3>
          <p class="logbook-cards__card__task-date">
            <span>
              {{ formatDateLong(logbook.dateTask) }}
            </span>
            <b class="inline-block mx-1 opacity-50">|</b>
            <span class="whitespace-no-wrap">
              {{ formatTime(logbook.startTimeTask) }}-{{ formatTime(logbook.endTimeTask) }}
            </span>
          </p>
        </div>
      </div>
      <br/>
      <p class="logbook-cards__card__task-name">
        {{ logbook.nameTask }}
      </p>
    </div>
  </component>
</template>

<script>
import itemMixin from './list-item-mixin'

import Rating from '../Rating'

export default {
  name: 'LogbookCardListItem',
  mixins: [itemMixin],
  components: {
    Rating
  },
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.logbook-cards__card {
  // display: grid;
  // grid-template-columns: auto 1fr;
  @apply rounded
  border border-solid border-gray-300;

  &__index {
    min-width: 5ch;
    @apply
    p-4
    border-r border-solid border-gray-300
    text-2xl text-gray-600;
  }

  &__main {
    @apply p-4;
  }

  &__header {
    @apply flex flex-wrap justify-between items-center;
  }

  &__project-name {
    @apply flex-1
    text-brand-green text-sm
    font-bold
    truncate;
  }

  &__task-date {
    @apply flex-none text-sm text-gray-600;
  }

  &__task-name {
    @apply text-gray-800 text-base;
  }

  &__info-wrapper {
    display: grid;
    grid-template-columns: auto auto;
    gap: 1rem 0.5rem;
    @apply -mx-2;
  }

  &__info {
    @apply p-2 rounded;

    &.is-clickable {
      @apply cursor-pointer;

      &:hover {
        @apply bg-gray-200;
      }
    }

    & > label {
      @apply block text-xs text-blue-400 font-bold;
    }
  }

  .document-icon {
    @apply text-sm text-blue-500;
  }

  .action-button {
    @apply border border-solid
    h-8 mx-1 px-3 py-1
    rounded
    font-bold;

    > span {
      @apply ml-1;
    }

    &:hover,
    &:focus {
      @apply outline-none;
    }
  }
}
</style>
