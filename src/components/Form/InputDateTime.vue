<template>
  <div>
    <ValidationProvider
      :name="name"
      ref="validator"
      :rules="rules"
      :custom-messages="customMessages"
      tag="div"
      @hook:mounted="onValidatorMounted">
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
      <input class="hidden" type="date" :value="value" :disabled="disabled">
    </ValidationProvider>
    <DateTime
      v-bind="$attrs"
      v-model="syncValue"
      :disabled="disabled"
      input-class="form-input__input"/>
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
import { Datetime as DateTime } from 'vue-datetime'

export default {
  inheritAttrs: false,
  components: {
    ...components,
    DateTime
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    ...props,
    value: {
      type: [String, Number, Date],
      default: null
    }
  },
  data () {
    return {
      errors: []
    }
  },
  computed: {
    syncValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('change', value)
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.form-input-date-time {

}
</style>
