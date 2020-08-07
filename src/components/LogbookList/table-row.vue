<template>
  <tr
    class="logbook-table__table-row">
    <td>
      {{ index }}
    </td>
    <td>
      {{ logbook.projectName }}
    </td>
    <td>
      <p class="whitespace-no-wrap">
        {{ formatDateLong(logbook.dateTask) }}
      </p>
    </td>
    <td>
      {{ logbook.nameTask }}
    </td>
    <td>
      <template v-if="hasEvidenceFile">
        <a
          :href="logbook.evidenceTaskURL"
          target="_blank"
          class="document-icon"
          @click.prevent="onClickEvidence">
          <i class="fa fa-file"></i>
        </a>
      </template>
      <i
        v-else>
        -
      </i>
    </td>
    <td>
      <template v-if="hasDocumentFile">
        <a
          :href="logbook.documentTaskURL"
          target="_blank"
          class="document-icon"
          @click.prevent="onClickDocument">
          <i class="fa fa-file"></i>
        </a>
      </template>
      <i
        v-else>
        -
      </i>
    </td>
    <td class="whitespace-no-wrap">
      <button
        class="action-button bg-green-500"
        @click="onEditLogbook">
        <i class="fa fa-pencil-alt"></i>
        <span>
          Edit
        </span>
      </button>
      <button
        class="action-button bg-red-500"
        @click="beforeDeleteLogbook">
        <i class="fa fa-trash"></i>
        <span>
          Delete
        </span>
      </button>
    </td>
  </tr>
</template>

<script>
import itemMixin from './list-item-mixin'
export default {
  mixins: [itemMixin]
}
</script>

<style lang="scss" scoped>
.logbook-table__table-row {
  td {
    vertical-align: middle;
    &:not([class*="px-0"]) {
      @apply px-4;
    }
    &:not([class*="py-0"]) {
      @apply py-2;
    }
  }

  td {
    @apply border-b border-solid border-gray-300
    text-left
    text-gray-700;
  }

  .document-icon {
    @apply h-8 px-4
    rounded bg-gray-200
    inline-flex justify-center items-center text-xl text-blue-500;

    &:hover,
    &:focus {
      @apply outline-none opacity-50;
    }
  }

  .action-button {
    @apply h-8 mx-1 px-3 py-1 rounded text-white;

    > *[class*="fa-"] {
      @apply mr-1;
    }

    &:hover,
    &:focus {
      @apply outline-none opacity-50;
    }
  }
}
</style>
