<template>
  <div class="form-input__file-preview">
    <figcaption class="mr-4">
      <img
        :src="url"
        class="form-input__file-preview__image"
        @click.prevent="onDownload"
      >
    </figcaption>
    <div class="mt-4 md:mt-0 self-stretch md:flex-auto flex flex-col justify-between">
      <p
        v-if="!disabled"
        class="mt-2 inline-block self-end text-sm"
      >
        <button
          class="w-auto py-2 px-4 mr-4 rounded border border-solid border-blue-500 text-blue-500 hover:opacity-50 hover:bg-blue-100"
          @click="onDownload"
        >
          Unduh
        </button>
        <button
          class="w-24 py-2 px-4 rounded border border-solid border-red-600 text-red-500 hover:opacity-50 hover:bg-red-100"
          @click="$emit('delete')"
        >
          Hapus
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      required: true
    }
  },
  methods: {
    onDownload (e) {
      window.open(this.url, '_blank')
    }
  }
}
</script>

<style>
</style>
