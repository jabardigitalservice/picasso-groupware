<template>
  <ValidationProvider :rules="rules"
                      :custom-messages="customMessages"
                      #default="{errors}"
                      tag="div">
    <FormInputHeader :label-for="name"
                      :title="title"
                      :subtitle="subtitle">
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #subtitle>
        <slot name="subtitle"></slot>
      </template>
    </FormInputHeader>
    <select class="form-input__select"
            :value="value"
            @change="onChange">
      <option selected
              :value="null"
              disabled>
        {{prompt}}
      </option>
      <option v-for="opt in options"
              :key="opt"
              :selected="opt === value"
              :value="opt">
        {{opt}}
      </option>
    </select>
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
    event: 'change'
  },
  props: {
    ...props,
    value: {
      type: [String, Number],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    idKey: {
      type: String
    },
    valueKey: {
      type: String
    },
    prompt: {
      type: String,
      default: 'Select one of these options'
    }
  },
  methods: {
    onChange (event) {
      this.$emit('change', event.target.value)
    }
  }
}
</script>
