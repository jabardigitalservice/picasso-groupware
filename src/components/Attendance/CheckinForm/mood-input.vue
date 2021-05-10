<template>
  <div class="form-mood-input">
    <FormInputHeader
      :title="inputTitle"
      :required="false">
    </FormInputHeader>
    <div class="form-mood-input__option-list">
      <i
        v-for="name in moodVariantNames"
        :key="name"
        aria-hidden="true"
        class="form-mood-input__option-list-item">
        <component :is="name" />
      </i>
    </div>
  </div>
</template>

<script>
import FormInputHeader from '../../Form/InputHeader.vue'
import { Angry, Haha, Like, Love, Sad, Wow, Yay } from '../../Reactions'

const moodVariants = {
  Angry,
  Haha,
  Like,
  Love,
  Sad,
  Wow,
  Yay
}

export default {
  components: {
    ...moodVariants,
    FormInputHeader
  },
  data () {
    return {
      inputTitle: 'Bagaimana mood kamu hari ini?',
      moodVariantNames: Object.keys(moodVariants)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-mood-input {

  &__option-list {
    grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
    gap: 1.5rem 2rem;

    @apply grid mt-3;

    @media screen and (min-width: 360px) {

    }
  }

  &__option-list-item {
    @apply cursor-pointer
    relative inline-block;
  }
}
</style>
