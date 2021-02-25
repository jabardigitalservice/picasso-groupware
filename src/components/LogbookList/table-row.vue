<template>
  <tr
    class="logbook-table__table-row">
    <td>
      {{ index }}
    </td>
    <td>
      <p class="whitespace-no-wrap">
        {{ formatDateLong(logbook.dateTask) }}
      </p>
    </td>
    <td>
      {{ logbook.projectName }}
    </td>
    <td>
      {{ logbook.nameTask }}
    </td>
    <td>
      <span
        v-if="hasTupoksi"
        title="Tupoksi sudah diisi"
        class="data-status-chip is-success">
        <i class="fa fa-check-circle"></i>
      </span>
      <span
        v-else
        title="Tupoksi belum diisi"
        class="data-status-chip is-danger"
        @click="onEditLogbook">
        <i class="fa fa-question-circle"></i>
      </span>
    </td>
    <td>
      <template v-if="hasEvidenceFile">
        <a
          :href="logbook.evidenceTaskURL"
          target="_blank"
          class="data-status-chip is-info"
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
      <a
        v-if="hasDocumentFile"
        :href="logbook.documentTaskURL"
        target="_blank"
        title="Lampiran sudah diisi"
        class="data-status-chip is-info"
        @click.prevent="onClickDocument">
        <i class="fa fa-file"></i>
      </a>
      <span
        v-else
        title="Lampiran belum diisi"
        class="data-status-chip is-danger"
        @click="onEditLogbook">
        <i class="fa fa-question-circle"></i>
      </span>
    </td>
    <td class="whitespace-no-wrap">
      <button
        class="action-button is-success"
        @click="onEditLogbook">
        <i class="fa fa-pencil-alt"></i>
        <span class="text-xs">
          Edit
        </span>
      </button>
      <button
        class="action-button is-danger"
        @click="beforeDeleteLogbook">
        <i class="fa fa-trash"></i>
        <span class="text-xs">
          Hapus
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
    vertical-align: top;
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

  .action-button {
    min-width: 80px;
    height: 36px;
    @apply mx-1 px-3 py-1 rounded
    bg-gray-100
    text-sm
    font-semibold uppercase
    tracking-widest;

    > *[class*="fa-"] {
      @apply mr-1 text-xs text-white;
    }

    &:hover,
    &:focus {
      @apply outline-none opacity-75;
    }

    &.is-success {
      @apply bg-green-500 text-green-200;
    }

    &.is-danger {
      @apply bg-red-500 text-red-200;
    }
  }
}
</style>
