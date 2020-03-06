<template>
  <ValidationProvider :rules="rules"
                      :custom-messages="customMessages"
                      #default="{failed, errors}"
                      tag="div"
                      ref="validator">
    <FormInputHeader :label-for="name"
                      :title="title"
                      :subtitle="subtitle"
                      :required="required">
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #subtitle>
        <slot name="subtitle"></slot>
      </template>
    </FormInputHeader>
    <DataLoader v-if="promisedMetadata"
                :promise="promisedMetadata">
      <template #pending>
        <ContentLoader  class="max-w-xs"
                        :width="320"
                        :height="234"
                        :speed="2"
                        primary-color="#eceff1"
                        secondary-color="#fafafa">
          <rect x="0" y="0" rx="8" ry="8" width="128" height="128"></rect>
          <rect x="0" y="144" rx="8" ry="8" width="25%" height="16"></rect>
          <rect x="0" y="176" rx="8" ry="8" width="100%" height="16"></rect>
          <rect x="0" y="208" rx="8" ry="8" width="75%" height="16"></rect>
        </ContentLoader>
      </template>
      <template #default="{value: metadata}">
        <FilePreview  v-if="metadata"
                      :name="filename"
                      :size="metadata.size"
                      :type="metadata.type"
                      :url="mFileURL"
                      @view="onPreviewDocument"
                      @update:name="onFilenameChanged"
                      @delete="onRemoveFile"/>
      </template>
    </DataLoader>
    <template v-else>
      <div :class="{'form-input__file mb-2': true, 'is-invalid': failed}">
        <button @click="onChooseFile">
          Pilih
        </button>
        <a :href="mFileURL || false"
            target="_blank"
            @click.prevent="onPreviewDocument">
          {{(mFile && mFile.name) || mFileURL}}
        </a>
      </div>
      <input v-show="false"
            ref="input"
            :name="name"
            :rules="rules"
            type="file"
            v-bind="$attrs"
            @change="onChange($event)">
    </template>
    <p v-if="errors.length"
       class="form-input__error-hint">
      <slot name="error">
        {{errors[0]}}
      </slot>
    </p>
  </ValidationProvider>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { getStoredFileMetadata } from '../../api'
import { props, components } from './input-mixin'
import { isMimeTypeImage } from '../Profile/Edit/utils'

export default {
  inheritAttrs: false,
  components: {
    ...components,
    ContentLoader,
    DataLoader: () => import('../DataLoader'),
    FilePreview: () => import('./FilePreview')
  },
  props: {
    ...props,
    value: {
      type: String
    },
    file: {
      type: File
    },
    filename: {
      type: String
    }
  },
  data () {
    return {
      mFile: null,
      mFileURL: null,

      promisedMetadata: null
    }
  },
  mounted () {
    this.$nextTick()
      .then(() => {
        this.$watch(
          function () {
            return [this.value, this.file]
          },
          function (arr) {
            const [value, file] = arr
            this.mFileURL = value
            this.mFile = file
            if (typeof this.mFileURL === 'string' && this.mFileURL.startsWith('http')) {
              this.promisedMetadata = this.getFileMetadata(this.mFileURL)
              this.$refs.validator.syncValue('')
            } else if (this.mFile instanceof File) {
              this.promisedMetadata = new Promise(resolve => resolve(this.mFile))
            }
          },
          { immediate: true, deep: true }
        )
      })
  },
  computed: {
    fileExtension () {
      if (!this.mFile) {
        return ''
      }
      return this.mFile.name.substring(this.mFile.name.lastIndexOf('.'))
    },
    shouldRenderPreview () {
      return isMimeTypeImage(this.fileExtension)
    }
  },
  methods: {
    getFileMetadata (url) {
      return new Promise((resolve, reject) => {
        getStoredFileMetadata(url)
          .then((metadata = {}) => {
            resolve({
              name: metadata.name,
              type: metadata.contentType,
              size: metadata.size
            })
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    resetInputElement () {
      if (this.$refs.input) {
        this.$refs.input.type = ''
        this.$refs.input.setAttribute('type', '')
        return this.$nextTick()
          .then(() => {
            this.$refs.input.type = 'file'
            this.$refs.input.setAttribute('type', 'file')
          })
      }
      return Promise.resolve()
    },
    onChooseFile () {
      this.mFile = null
      this.mFileURL = null
      this.resetInputElement()
        .then(() => {
          this.$refs.input.click()
        })
    },
    onRemoveFile () {
      this.promisedMetadata = null
      this.resetInputElement()
        .then(() => {
          this.mFile = null
          this.mFileURL = null
          this.emitChange(null, null, null)
          return this.$nextTick()
        }).then(() => {
          this.$refs.validator.syncValue(undefined)
          this.$refs.validator.reset()
        })
    },
    onFilenameChanged (name) {
      this.$emit('update:filename', name)
    },
    onChange (e) {
      if (e.target.files) {
        this.mFile = e.target.files.length ? e.target.files[0] : null
        this.mFileURL = window.URL.createObjectURL(this.mFile)
        this.emitChange(this.mFileURL, this.mFile.name, this.mFile)
      }
      this.$nextTick()
        .then(() => {
          this.$refs.validator.validate(e)
        })
    },
    emitChange (url, filename, file) {
      this.$emit('update:value', url)
      this.$emit('update:filename', filename)
      this.$emit('update:file', file)
    },
    onPreviewDocument () {
      this.mFileURL && window.open(this.mFileURL, '_blank')
    }
  }
}
</script>

<style>
</style>
