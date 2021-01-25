<template>
  <div>
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
    <template v-if="showAsReadonlyInput">
      <FormInputText
        disabled
        readonly
        type="text"
        :name="name"
        :title="title"
        :value="selectedOptionLabel"
      />
    </template>
    <template v-else>
      <div
        v-for="(opt, index) in options"
        :key="index"
        class="mb-2 flex flex-row justify-start items-baseline"
      >
        <template v-if="index === 0">
          <ValidationProvider
            :rules="rules"
            :custom-messages="customMessages"
            ref="validator"
            tag="div"
            @hook:mounted="onValidatorMounted"
          >
            <input
              :id="getOptionId(opt)"
              type="radio"
              :value="getOptionValue(opt)"
              :checked="getOptionValue(opt) === value"
              :name="name"
              class="mr-2"
              @change="onChange(opt, $event)"
            >
          </ValidationProvider>
        </template>
        <template v-else>
          <input
            :id="getOptionId(opt)"
            type="radio"
            :value="getOptionValue(opt)"
            :checked="getOptionValue(opt) === value"
            :name="name"
            class="mr-2"
            @change="onChange(opt, $event)"
          >
        </template>
        <label
          :for="getOptionId(opt)"
          class="cursor-pointer">
          <slot
            name="option-label"
            v-bind="{ option: opt, index }">
            <p class="text-gray-700 ml-2 mb-2">
              {{ getOptionLabel(opt) }}
            </p>
          </slot>
        </label>
      </div>
      <p
        v-if="errors.length"
        class="form-input__error-hint"
      >
        <slot name="error">
          {{errors[0]}}
        </slot>
      </p>
    </template>
  </div>
</template>

<script>
import { props, components } from './input-mixin'
import FormInputText from './Input'

export default {
  components: {
    ...components,
    FormInputText
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    ...props,
    showAsReadonlyInput: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String
    },
    labelKey: {
      type: String
    }
  },
  data () {
    return {
      errors: []
    }
  },
  computed: {
    selectedOptionLabel () {
      const selectedOpt = this.options.find((opt) => {
        return this.getOptionValue(opt) === this.value
      })
      return this.getOptionLabel(selectedOpt)
    }
  },
  methods: {
    getOptionId (option) {
      return `opt-${this.name}-${this.getOptionValue(option)}`
    },
    getOptionProperty (option, propertyKey) {
      if (!option || typeof option !== 'object') {
        throw new TypeError('option is not object like')
      }
      return option[propertyKey]
    },
    getOptionValue (option) {
      try {
        return this.getOptionProperty(option, this.valueKey)
      } catch (e) {
        return option
      }
    },
    getOptionLabel (option) {
      try {
        return this.getOptionProperty(option, this.labelKey)
      } catch (e) {
        return option
      }
    },
    onValidatorMounted () {
      this.$watch(
        function () {
          return this.$refs.validator.length ? this.$refs.validator[0].errors : []
        },
        function (errors) {
          this.errors = errors
        },
        { immediate: true, deep: true }
      )
    },
    onChange (option, event) {
      if (event.target.checked) {
        const value = this.getOptionValue(option)
        this.$emit('change', value)
      }
    }
  }
}
</script>
