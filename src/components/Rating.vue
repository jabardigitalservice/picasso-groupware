<script>
export default {
  props: {
    max: {
      type: Number,
      default: 5
    },
    rating: {
      type: Number
    }
  },
  render (h) {
    const ratings = []
    for (let i = 0; i < this.max; i++) {
      const vnode = this.$createElement('i', {
        key: i,
        class: 'rating__default-symbol',
        style: {
          opacity: i < this.rating ? 1 : 0.33
        }
      })
      ratings.push(vnode)
    }
    return h('div', ratings)
  }
}
</script>

<style lang="scss" scoped>
.rating__default-symbol {
  @apply inline-block w-3 h-3 mr-1 rounded-full
  bg-brand-blue-darkest;
}
</style>
