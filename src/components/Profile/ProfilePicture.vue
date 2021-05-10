<template>
  <a
    :href="url || null"
    target="_blank"
    class="profpic-anchor"
    :style="[imageSize]">
    <i
      v-if="isLoading"
      class="profpic bg-shimmering" />
    <img
      v-else
      alt="User Avatar"
      class="profpic"
      :src="url || placeholder"
      @error="onImageError">
  </a>
</template>

<script>
import { ASSETS } from '@/lib/constants'

export default {
  props: {
    size: {
      type: Number,
      validator: (v) => {
        return v > 0
      }
    },
    url: {
      type: String
    },
    isLoading: {
      type: Boolean
    },
    placeholder: {
      type: String,
      default: ASSETS.AVATAR_PLACEHOLDER
    }
  },
  computed: {
    imageSize () {
      const size = this.size || 64
      return {
        width: `${size}px`,
        height: `${size}px`
      }
    }
  },
  methods: {
    onImageError (e) {
      e.target.src = this.placeholder
    }
  }
}
</script>

<style lang="scss" scoped>
.profpic-anchor {
  @apply inline-block rounded-full overflow-hidden;
}
.profpic {
  @apply inline-block w-full h-full object-cover object-center;
}
</style>
