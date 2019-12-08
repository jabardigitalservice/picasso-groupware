<template>
  <div class="home">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full bg-white p-4">
          <template v-if="!authLoading">
            <img alt="Vue logo" src="../assets/logo.png">
            <HelloWorld msg="Welcome"/>
          </template>
          <template v-else>
            <content-loader-common/>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '../components/HelloWorld.vue'
import { mapGetters } from 'vuex'
import ContentLoaderCommon from '../components/ContentLoaderCommon'

export default {
  name: 'home',
  components: {
    HelloWorld,
    ContentLoaderCommon
  },

  computed: mapGetters({
    authLoading: 'auth/loading'
  })
}
</script>
