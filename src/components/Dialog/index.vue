<template>
  <div :class="['dialog-overlay', show && 'is-active']" @click.self="onClickOverlay">
    <Card v-if="lazy ? show : true" class="dialog-content">
      <slot></slot>
    </Card>
  </div>
</template>

<script>
import Card from '../Card'
export default {
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
    }
  },
  methods: {
    onClickOverlay () {
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
  pointer-events: none;
  @apply z-50 fixed inset-0
  flex justify-center items-center;

  &.is-active {
    pointer-events: all;
    visibility: visible;
  }
}

.dialog-content {
  transition-property: transform, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  transform: translateY(0);
  opacity: 0;
}

.dialog-overlay.is-active {
  .dialog-content {
    transform: translateY(-1rem);
    opacity: 1;
  }
}
</style>
