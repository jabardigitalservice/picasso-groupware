<template>
  <ValidationProvider
    :rules="rules"
    :custom-messages="customMessages"
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
        Pilih
      </button>
    </div>
    <input
      v-show="false"
      ref="input"
      :name="name"
      :rules="rules"
      type="file"
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
      mUrl: null
    }
  },
  computed: {
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
      this.$emit('preview')
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
      this.mUrl = null
      this.resetInputElement()
        .then(() => {
          this.$refs.input.click()
        })
    },
    onRemoveFile () {
      this.resetInputElement()
        .then(() => {
          this.mFile = null
          this.mUrl = null
          this.emitChange(null, null, null)
          return this.$nextTick()
        }).then(() => {
          this.$refs.validator.validate()
        })
    },
    onChange (e) {
      if (e.target.files) {
        this.mFile = e.target.files.length ? e.target.files[0] : null

        this.mUrl = window.URL.createObjectURL(this.mFile)
        this.emitChange(this.mUrl, this.mFile)
      }
    },
    emitChange (url, file) {
      this.$emit('change', url, file)
    }
  }
}
</script>

<style>
</style>
