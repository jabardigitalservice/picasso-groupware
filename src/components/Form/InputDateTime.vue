<template>
  <div>
    <ValidationProvider
      :rules="rules"
      :custom-messages="customMessages"
      #default="{failed, errors}"
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
      <input class="hidden" type="date" :value="value">
      <p v-if="errors.length"
        class="form-input__error-hint">
        <slot name="error">
          {{errors[0]}}
        </slot>
      </p>
    </ValidationProvider>
    <DateTime
      v-bind="$attrs"
      v-model="syncValue"
      input-class="form-input__input"/>
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
  computed: {
    syncValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('change', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-input-date-time {

}
</style>
