<template>
  <div>
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
    <ValidationProvider :rules="rules"
                        :custom-messages="customMessages"
                        ref="validator"
                        tag="div"
                        class="hidden"
                        @hook:mounted="onValidatorMounted">
      <input type="radio"
            :value="value"
            :checked="value !== null && typeof value !== 'undefined' ? true : false"
            :name="name">
    </ValidationProvider>
    <div class="mb-2 flex flex-row flex-no-wrap justify-center items-center
                rounded overflow-hidden
                border border-solid border-brand-blue">
      <button
          v-for="(opt, index) in options"
          :key="index"
          :class="{
            'flex-1 px-6 py-2 border-solid outline-none focus:outline-none': true,
            'border-l': index !== 0,
            'text-white border-brand-blue bg-brand-blue hover:bg-brand-blue-light': opt === value,
            'text-gray-500 border-gray-300 hover:bg-gray-300': opt !== value,
          }"
          @click="onOptionSelected(opt)">
        {{opt}}
      </button>
    </div>
    <p v-if="errors.length"
       class="form-input__error-hint">
      <slot name="error">
        {{errors[0]}}
      </slot>
    </p>
  </div>
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
  data () {
    return {
      errors: []
    }
  },
  methods: {
    onValidatorMounted () {
      this.$watch(
        function () {
          return this.$refs.validator.errors || []
        },
        function (errors) {
          this.errors = errors
        },
        { immediate: true, deep: true }
      )
    },
    onOptionSelected (option) {
      this.$emit('change', option)
    }
  }
}
</script>
