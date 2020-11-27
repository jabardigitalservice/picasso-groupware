<template>
  <ValidationProvider :rules="rules"
                      :disabled="shouldDisableValidation"
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
                        :height="128"
                        :speed="2"
                        primary-color="#eceff1"
                        secondary-color="#fafafa">
          <rect x="0" y="0" rx="8" ry="8" width="128" height="128"></rect>
          <rect x="144" y="0" rx="8" ry="8" width="100" height="16"></rect>
          <rect x="144" y="32" rx="8" ry="8" width="176" height="16"></rect>
          <rect x="144" y="64" rx="8" ry="8" width="176" height="16"></rect>
          <rect x="144" y="96" rx="8" ry="8" width="64" height="16"></rect>
        </ContentLoader>
      </template>
      <template #default="{value: metadata}">
        <FilePreview  v-if="metadata"
                      :file="file"
                      :name="filename"
                      :size="metadata.size"
                      :type="metadata.type"
                      :url="mFileURL"
                      :disabled="disabled"
                      :renameable="renameable"
                      :download-on-click="downloadOnClick"
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
          {{(mFile && mFile.name) || mFileURL || $attrs.placeholder }}
        </a>
      </div>
      <input v-show="false"
            ref="input"
            :name="name"
            :rules="rules"
            type="file"
            :multiple="false"
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

const STORAGE = {
  FIREBASE: 'firebase',
  GROUPWARE_SERVICE: 'groupware-service'
}

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
    },
    source: {
      type: String,
      default: STORAGE.FIREBASE,
      validator (v) {
        return [STORAGE.FIREBASE, STORAGE.GROUPWARE_SERVICE].includes(v)
      }
    },
    renameable: {
      type: Boolean,
      default: true
    },
    downloadOnClick: {
      type: Boolean,
      default: false
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
            this.$refs.validator.syncValue(value)
            this.mFileURL = value
            this.mFile = file
            if (typeof this.mFileURL === 'string' && this.mFileURL.startsWith('http')) {
              this.promisedMetadata = this.getFileMetadata(this.mFileURL)
            } else if (this.mFile instanceof File) {
              this.promisedMetadata = new Promise(resolve => resolve(this.mFile))
            }
          },
          { immediate: true, deep: true }
        )
      })
  },
  computed: {
    shouldDisableValidation () {
      return typeof this.value === 'string' && ['blob', 'http'].some(str => this.value.startsWith(str))
    }
  },
  methods: {
    getFileMetadata (url) {
      if (this.source === STORAGE.FIREBASE) {
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
      }
      if (this.source === STORAGE.GROUPWARE_SERVICE) {
        return Promise.resolve({})
      }
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
          this.$refs.validator.validate()
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
