<template>
  <ValidationProvider
    :rules="rules"
    :custom-messages="customMessages"
    #default="{errors}"
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
    <template v-if="disabled">
      <input
      type="text"
      :name="name"
      :value="selectedOptionLabel"
      :disabled="disabled"
      class="form-input__input"
    >
    </template>
    <template v-else>
      <select
        class="form-input__select"
        :value="value"
        @change="onChange"
      >
        <option
          selected
          :value="null"
          disabled
        >
          {{prompt}}
        </option>
        <option
          v-for="(opt, index) in options"
          :key="index"
          :selected="getOptionValue(opt) === value"
          :value="getOptionValue(opt)"
        >
          {{getOptionLabel(opt)}}
        </option>
      </select>
    </template>
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
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    prompt: {
      type: String,
      default: 'Select one of these options'
    }
  },
  computed: {
    hasObjectAsOptions () {
      return Array.isArray(this.options) && this.options.every(x => x && typeof x === 'object')
    },
    selectedOptionLabel () {
      if (Array.isArray(this.options)) {
        const selectedOpt = this.options.find(opt => this.getOptionValue(opt) === this.value)
        return selectedOpt ? this.getOptionLabel(selectedOpt) : null
      }
      return null
    }
  },
  methods: {
    onChange (event) {
      const v = event.target.value
      if (this.hasObjectAsOptions) {
        const opt = this.options.find(x => this.getOptionValue(x) === v)
        if (opt) {
          this.$emit('change', opt)
        }
      } else {
        this.$emit('change', event.target.value)
      }
    },
    getOptionLabel (option) {
      if (option && typeof option === 'object') {
        return option[this.labelKey]
      }
      return option
    },
    getOptionValue (option) {
      if (option && typeof option === 'object') {
        return option[this.valueKey]
      }
      return option
    }
  }
}
</script>
