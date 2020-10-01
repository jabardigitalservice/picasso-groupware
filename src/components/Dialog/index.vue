<template>
  <div :class="['dialog-overlay', show && 'is-active']" @click.self="onClickOverlay">
    <Card
      v-if="lazy ? show : true"
      class="dialog-body"
      :style="{ maxWidth }"
      paddingless>
      <div class="dialog-content">
        <slot></slot>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '../Card'
export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  components: {
    Card
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // do not render content when its hidden
    lazy: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: '640px'
    }
  },
  methods: {
    onClickOverlay () {
      this.$emit('change', false)
      this.$emit('update:show', false)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-overlay {
  background-color: rgba(0,0,0,0.1);
  backdrop-filter: blur(4px);
  visibility: hidden;
  @apply z-50 fixed inset-0
  overflow-hidden
  flex justify-center items-center
  p-8
  pointer-events-none;

  &.is-active {
    pointer-events: all;
    visibility: visible;
  }
}

.dialog-body {
  transition-property: transform, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  transform: translateY(1rem);
  opacity: 0;
  @apply max-h-full overflow-hidden
  flex flex-row;
}

.dialog-content {
  @apply max-h-full;
}

.dialog-overlay.is-active {
  .dialog-body {
    transform: translateY(0rem);
    opacity: 1;
  }
}
</style>
