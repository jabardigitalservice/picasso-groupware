<template>
  <ValidationProvider :rules="rules"
                      :custom-messages="customMessages"
                      #default="{failed, errors}"
                      tag="div">
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
    <textarea :name="name"
              :value="value"
              :class="{'form-input__textarea': true, 'is-invalid': failed}"
              v-bind="$attrs"
              @input="onInput">
    </textarea>
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
  components: {
    ...components
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    ...props,
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style>
</style>
