<template>
  <ValidationProvider
    :rules="rules"
    :custom-messages="customMessages"
    #default="{failed, errors, validate}"
    tag="div"
  >
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
    <div
      v-if="value"
      class="document-icon"
    />
    <div
      :class="{'form-input__file mb-2': true, 'is-invalid': failed}"
    >
      <button
        v-if="!file"
        role="add"
        @click="onChooseFile"
      >
        Pilih
      </button>
      <button
        v-else
        role="remove"
        @click="onRemoveFile"
      >
        Hapus
      </button>
      <a
        :href="objectURL || false"
        target="_blank"
        @click.prevent="onPreviewDocument"
      >
        {{file ? file.name : ''}}
      </a>
    </div>
    <input
      v-show="false"
      ref="input"
      :name="name"
      type="file"
      v-bind="$attrs"
      @change="onChange(validate, $event)"
    >
    <p v-if="errors.length"
       class="form-input__error-hint">
      <slot name="error">
        {{errors[0]}}
      </slot>
    </p>
  </ValidationProvider>
</template>

<script>
import { props, components } from './input-mixin'

export default {
  inheritAttrs: false,
  components: {
    ...components
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    ...props,
    value: {
      type: File
    }
  },
  data () {
    return {
      file: null,
      objectURL: null
    }
  },
  methods: {
    onChooseFile () {
      this.file = null
      this.objectURL = null
      if (this.$refs.input) {
        this.$refs.input.setAttribute('type', '')
        this.$nextTick(() => {
          this.$refs.input.setAttribute('type', 'file')
          this.$refs.input.click()
        })
      }
    },
    onRemoveFile () {
      this.file = null
      this.objectURL = null
    },
    onChange (validator, e) {
      if (typeof validator === 'function') {
        validator(e)
      }
      if (e.target.files) {
        this.file = e.target.files.length ? e.target.files[0] : null
        this.objectURL = window.URL.createObjectURL(this.file)
        this.$emit('change', this.file)
      }
    },
    onPreviewDocument (e) {
      if (!e.target.href) {
        return
      }
      window.open(e.target.href, '_blank')
    }
  }
}
</script>

<style>
</style>
