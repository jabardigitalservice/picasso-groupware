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
    <div v-for="(opt, index) in options"
         :key="index"
         class="mb-2 flex flex-row justify-start items-baseline">
      <input type="radio"
            :checked="opt === value"
            :name="name"
            class="mr-2"
            @change="onChange(opt, $event)">
      <label :for="opt">
        {{opt}}
      </label>
    </div>
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
    }
  },
  methods: {
    onChange (option, event) {
      if (event.target.checked) {
        this.$emit('change', option)
      }
    }
  }
}
</script>
