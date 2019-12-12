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
import firebase from 'firebase'

export default {
  components: {
    Navbar
  },

  mounted () {
    this.$store.dispatch('home-banners/fetchItems')

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('messages-list/fetchItems', { userId: user.uid })
      }
    })
  }
}
</script>
