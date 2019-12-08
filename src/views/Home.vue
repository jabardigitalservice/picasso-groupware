<template>
  <div class="home">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full bg-white p-4">
          <img alt="Vue logo" src="../assets/logo.png" class="mx-auto">

          <HelloWorld msg="Groupware"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '../components/HelloWorld.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    HelloWorld
  },

  computed: mapGetters({
    authLoading: 'auth/loading'
  })
}
</script>
