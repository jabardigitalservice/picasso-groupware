<template>
  <div>
    <FormInputHeader
      :label-for="name"
      :title="title"
      :subtitle="subtitle"
      :required="required"
    >
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #subtitle>
        <slot name="subtitle"></slot>
      </template>
    </FormInputHeader>
    <FileSelector
      :file="mFile"
      :url="mUrl"
      v-bind="$props"
      @preview="onSaveDocument"
      @change="onSelectedFileChange"
    />
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import { props, components } from './input-mixin'

export default {
  components: {
    ...components,
    FileSelector: () => import('./FileSelector')
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    ...props,
    path: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      mFile: null,
      mUrl: null
    }
  },
  computed: {
    isFileFromStorage () {
      return typeof this.fullPath === 'string' && this.fullPath.startsWith('http')
    },
    isSelectedFileChanged () {
      return this.mUrl && this.mUrl !== this.url
    }
  },
  watch: {
    url: {
      immediate: true,
      handler (v) {
        this.mUrl = v
      }
    }
  },
  methods: {
    getDocumentTaskFile (path) {
      return this.$store.dispatch('logbook-documents/getDocument', { path })
    },
    onSelectedFileChange (url, file) {
      this.mUrl = url
      this.mFile = file
    },
    async onSaveDocument () {
      try {
        if (this.mFile instanceof File) {
          saveAs(this.mFile, `${this.mFile.name}`)
        } else if (typeof this.url === 'string' && this.url.startsWith('http')) {
          this.$swal.fire({
            title: 'Mengambil data...',
            onBeforeOpen: () => this.$swal.showLoading()
          })
          const file = await this.$promiseMinDelay(this.getDocumentTaskFile(this.path), 1000)
          this.$swal.close()
          saveAs(file, file.name)
        }
      } catch (e) {
        this.$swal.fire({
          icon: 'error',
          text: 'Terjadi kesalahan dalam pembacaan dokumen',
          confirmButtonText: 'Tutup'
        })
      }
    },
    getSelectedFile () {
      return this.isSelectedFileChanged ? this.mFile : null
    }
  }
}
</script>

<style>
</style>
