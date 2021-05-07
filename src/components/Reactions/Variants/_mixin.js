const DEFAULT_EMOJI_WIDTH_PX = 120

export const reactionMixin = {
  props: {
    animate: {
      type: Boolean,
      default: false
    }
  },
  async mounted () {
    await this.$nextTick()
    this.watchAnimationProp()
    this.watchWrapperWidth()

    window.removeEventListener('resize', this.watchWrapperWidth)
    setTimeout(() => {
      window.addEventListener('resize', this.watchWrapperWidth)
    }, 10)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.watchWrapperWidth)
  },
  methods: {
    watchAnimationProp () {
      // disable animation unless icon is hovered
      this.$watch(
        'animate',
        function handler (shouldAnimate) {
          const disabler = 'emoji-animation-disabled'
          const isAnimationDisabled = this.$el
            .classList
            .contains(disabler)

          if (shouldAnimate && isAnimationDisabled) {
            this.$el.classList.remove(disabler)
          } else if (!shouldAnimate && !isAnimationDisabled) {
            this.$el.classList.add(disabler)
          }
        },
        { immediate: true }
      )
    },
    watchWrapperWidth () {
      const parentEl = this.$el.parentNode
      if (!parentEl) {
        return
      }

      const { width: parentWidth } = parentEl.getBoundingClientRect()

      const scale = parentWidth / DEFAULT_EMOJI_WIDTH_PX
      this.$el.style.setProperty('transform', `scale(${scale})`)
      parentEl.style.setProperty('height', `${parentWidth}px`)
    }
  }
}
