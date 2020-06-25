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
    <div
      :class="{
        'mb-2 rounded overflow-hidden border border-solid border-brand-blue': true,
        'flex-row flex-no-wrap justify-center items-center': true,
        'flex': block,
        'inline-flex': !block
      }">
      <button
          v-for="(opt, index) in options"
          :key="index"
          :class="{
            'flex-1 px-6 py-2 border-solid outline-none focus:outline-none': true,
            'border-l': index !== 0,
            'text-white border-brand-blue bg-brand-blue hover:bg-brand-blue-light': getOptionValue(opt) === value,
            'text-gray-500 border-gray-300 hover:bg-gray-300': getOptionValue(opt) !== value,
          }"
          @click="onOptionSelected(opt)">
        {{ getOptionLabel(opt) }}
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
    block: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number, Boolean],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  data () {
    return {
      errors: []
    }
  },
  methods: {
    getOptionLabel (opt) {
      if (opt && typeof opt === 'object') {
        return opt[this.labelKey]
      }
      return opt
    },
    getOptionValue (opt) {
      if (opt && typeof opt === 'object') {
        return opt[this.valueKey]
      }
      return opt
    },
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
      this.$emit('change', this.getOptionValue(option))
    }
  }
}
</script>
