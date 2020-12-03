<template>
  <div class="form-input__header">
    <slot name="title">
      <label
        v-if="title"
        :for="labelFor"
        :class="['form-input__title', required && 'is-required']"
      >
        {{title}}
      </label>
    </slot>
    <div
      v-if="subtitle || $slots.subtitle"
      class="form-input__subtitle"
    >
      <slot name="subtitle">
        <p>
          {{subtitle}}
        </p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    labelFor: {
      type: String
    },
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    required: {
      type: Boolean,
      default: true
    }
  }
}
</script>
