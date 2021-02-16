<template>
  <ValidationProvider
    :rules="rules"
    :custom-messages="customMessages"
    :disabled="isValidationDisabled"
    #default="{failed, errors}"
    tag="div"
    ref="validator"
  >
    <div :class="{'form-input__file mb-2': true, 'is-invalid': failed}">
      <a
        href="javascript:void(0)"
        target="_blank"
        @click.prevent="onPreview"
      >
        <span>
          {{ filename || $attrs.placeholder }}
        </span>
      </a>
      <button
        v-if="!disabled"
        :disabled="disabled"
        @click="onChooseFile"
      >
        <slot name="choose-file-button-text">
          Pilih
        </slot>
      </button>
    </div>
    <input
      v-show="false"
      ref="input"
      :name="name"
      type="file"
      :accept="$attrs.accept"
      :multiple="false"
      v-bind="$attrs"
      @change="onChange($event)"
    >
    <p
      v-if="errors.length"
      class="form-input__error-hint"
    >
      <slot name="error">
        {{errors[0]}}
      </slot>
    </p>
  </ValidationProvider>
</template>

<script>
import { props } from './input-mixin'

export default {
  inheritAttrs: false,
  props: {
    ...props,
    url: {
      type: String,
      default: null
    },
    file: {
      type: File,
      default: null
    }
  },
  data () {
    return {
      mFile: null,
      mUrl: null,
      isValid: null
    }
  },
  computed: {
    isValidationDisabled () {
      const { mUrl } = this
      if (typeof mUrl !== 'string' || !mUrl.length) {
        return false
      }
      // if mUrl starts with these string, assume file either has already been uploaded or changed
      return ['http', 'blob:'].some((str) => mUrl.startsWith(str))
    },
    filename () {
      if (this.mFile instanceof File) {
        return this.mFile.name
      }
      if (typeof this.url === 'string' && this.url.startsWith('http')) {
        const i = this.url.lastIndexOf('document/')
        return this.url.substring(i)
      }
      return null
    }
  },
  watch: {
    url: {
      immediate: true,
      handler (v) {
        this.mUrl = v
      }
    },
    file: {
      immediate: true,
      handler (v) {
        this.mFile = v
      }
    }
  },
  methods: {
    onPreview () {
      if (this.isValid) {
        this.$emit('preview')
      } else if (this.mUrl) {
        window.open(this.mUrl, '_blank')
      }
    },
    resetInputElement () {
      if (this.$refs.input) {
        this.$refs.validator.reset()
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
      this.isValid = null
      this.mFile = null
      this.mUrl = null
      this.resetInputElement()
        .then(() => {
          this.$refs.input.click()
        })
    },
    onRemoveFile () {
      this.resetInputElement()
        .then(() => {
          this.isValid = null
          this.mFile = null
          this.mUrl = null
          this.emitChange(null, null)
          return this.$nextTick()
        }).then(() => {
          this.$refs.validator.validate()
        })
    },
    async onChange (e) {
      if (e.target.files) {
        const file = e.target.files[0] || null
        await this.$refs.validator.syncValue(file)
        const { valid } = await this.$refs.validator.validate()
        this.isValid = valid
        this.mFile = file
        this.mUrl = window.URL.createObjectURL(this.mFile)
        if (this.isValid) {
          this.emitChange(this.mUrl, this.mFile)
        } else {
          this.emitChange(null, null)
        }
      }
    },
    emitChange (url, file) {
      this.$emit('change', url, file)
    }
  }
}
</script>
