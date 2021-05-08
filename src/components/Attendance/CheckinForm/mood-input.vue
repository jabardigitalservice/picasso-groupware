<template>
  <ValidationProvider
    :name="name"
    class="form-mood-input"
    rules="required"
    :custom-messages="{
      required: 'Bagian ini harus diisi'
    }"
    #default="{ errors }"
    >
    <FormInputHeader
      :title="inputTitle">
    </FormInputHeader>
    <input
      type="hidden"
      :name="name"
      v-model="mValue"
    />
    <div class="form-mood-input__option-list">
      <i
        v-for="name in moodVariantNames"
        :key="name"
        aria-hidden="true"
        class="form-mood-input__option-list-item">
        <component
          :is="getMoodComponent(name)"
          :animate="name === mValue"
          class="emoji-animation-disabled"
          @click.native="onClick(name)" />
      </i>
    </div>
    <p v-if="errors.length"
       class="mt-3 form-input__error-hint">
      <slot name="error">
        {{ errors[0] }}
      </slot>
    </p>
  </ValidationProvider>
</template>

<script>
import FormInputHeader from '../../Form/InputHeader.vue'
import { moodMap } from '../../Reactions'

export default {
  components: {
    FormInputHeader
  },
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String
    }
  },
  data () {
    return {
      inputTitle: 'Bagaimana mood kamu hari ini?',
      moodVariantNames: Object.keys(moodMap),
      mValue: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        this.mValue = v
      }
    }
  },
  methods: {
    getMoodComponent (name) {
      return moodMap[name]
    },
    onClick (name) {
      this.mValue = name
      this.$emit('input', name)
      this.$emit('update:value', name)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-mood-input {

  &__option-list {
    grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
    gap: 1.5rem 2rem;

    @apply grid mt-2;

    @media screen and (min-width: 360px) {

    }
  }

  &__option-list-item {
    @apply cursor-pointer
    relative inline-block;
  }
}
</style>
