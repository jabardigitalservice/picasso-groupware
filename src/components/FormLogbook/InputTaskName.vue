<template>
  <FormInput
    name="nameTask"
    title="Nama Task"
    type="text"
    :disabled="disabled"
    rules="required"
    :custom-messages="{
      required: 'Nama task harus diisi'
    }"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script>
import { props } from '../Form/input-mixin'
export default {
  components: {
    FormInput: () => import('../Form/Input')
  },
  props: {
    ...props,
    value: {
      type: String
    }
  }
}
</script>
