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
            type="radio"
            :value="opt"
            :checked="opt === value"
            :name="name"
            class="mr-2"
            @change="onChange(opt, $event)"
          >
        </ValidationProvider>
      </template>
      <template v-else>
        <input
          type="radio"
          :value="opt"
          :checked="opt === value"
          :name="name"
          class="mr-2"
          @change="onChange(opt, $event)"
        >
      </template>
      <label :for="opt">
        {{opt}}
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
        this.$emit('change', option)
      }
    }
  }
}
</script>
