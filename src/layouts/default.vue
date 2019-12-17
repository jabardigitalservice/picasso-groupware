<template>
  <div class="select-none">
    <div class="bg-brand-green-dark h-10"></div>
    <slot>
      <router-view />
    </slot>
    <navbar />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },

  mounted () {
    this.$store.dispatch('home-banners/fetchItems')
    this.$store.dispatch('home-articles/fetchItems')
    this.$store.dispatch('messages-list/fetchItems')
  }
}
</script>
