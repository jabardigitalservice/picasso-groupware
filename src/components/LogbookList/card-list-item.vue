<template>
  <component :is="tag" class="logbook-cards__card">
    <div class="logbook-cards__card__header">
      <div>
        <i class="logbook-cards__card__index">
          {{ index }}
        </i>
      </div>
      <div class="whitespace-no-wrap">
        <button
          v-for="(action, index) in actions"
          :key="index"
          :title="action.title"
          :class="action.btnClassName"
          @click="action.clickHandler">
          <i :class="action.iconClassName"></i>
        </button>
      </div>
    </div>
    <p class="logbook-cards__card__task-date">
      <span>
        {{ formatDateLong(logbook.dateTask, 'eeee, PPP') }}
      </span>
    </p>
    <div class="logbook-cards__card__info-wrapper">
      <label>Nama Project</label>
      <p><strong>{{ logbook.projectName }}</strong></p>

      <label>Nama Task</label>
      <p>{{ logbook.nameTask }}</p>

      <label>Status Tupoksi</label>
      <p class="text-xs">
        <span
          v-if="hasTupoksi"
          title="Tupoksi sudah diisi"
          class="data-status-chip is-success">
          Sudah Diisi
        </span>
        <span
          v-else
          title="Tupoksi belum diisi"
          class="data-status-chip is-danger"
          @click="onEditLogbook">
          Belum Diisi
        </span>
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
    return {
      actions: [
        {
          btnClassName: 'action-button is-info',
          iconClassName: 'fa fa-eye',
          title: 'Detail',
          clickHandler: this.onOpenLogbookDetail
        },
        {
          btnClassName: 'action-button is-success',
          iconClassName: 'fa fa-pencil-alt',
          title: 'Edit',
          clickHandler: this.onEditLogbook
        },
        {
          btnClassName: 'action-button is-danger',
          iconClassName: 'fa fa-trash',
          title: 'Hapus',
          clickHandler: this.beforeDeleteLogbook
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.logbook-cards__card {
  // display: grid;
  // grid-template-columns: auto 1fr;
  @apply p-4 rounded
  border border-solid border-gray-300;

  &__index {
    @apply mb-2 text-base text-gray-500 font-bold not-italic;
  }

  &__header {
    @apply flex flex-wrap justify-between items-start;
  }

  &__project-name {
    @apply flex-1
    text-brand-green text-sm
    font-bold
    truncate;
  }

  &__task-date {
    @apply my-2 flex-none text-sm text-gray-700;
  }

  &__info-wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem 1rem;
    @apply mt-4 text-sm;

    > label {
      @apply text-gray-700;
    }
  }

  .document-icon {
    @apply text-sm text-blue-500;
  }

  .action-button {
    @apply border border-solid
    h-8 mx-1 px-3 py-1
    rounded
    text-xs font-bold;

    > span {
      @apply ml-1;
    }

    &:hover,
    &:focus {
      @apply outline-none;
    }

    &.is-info {
      @apply text-blue-500 border-blue-500;
      &:hover {
        @apply  text-white bg-blue-500;
      }
    }

    &.is-success {
      @apply text-green-500 border-green-500;
      &:hover {
        @apply  text-white bg-green-500;
      }
    }

    &.is-danger {
      @apply text-red-500 border-red-500;
      &:hover {
        @apply  text-white bg-red-500;
      }
    }
  }
}
</style>
