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
            <content-loader
              :height="475"
              :width="400"
              :speed="2"
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <circle cx="30" cy="30" r="30" />
              <rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
              <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
              <rect x="0" y="70" rx="5" ry="5" width="400" height="100" />
            </content-loader>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapGetters } from 'vuex'
import { ContentLoader } from 'vue-content-loader'

export default {
  name: 'home',
  components: {
    HelloWorld,
    ContentLoader
  },

  computed: mapGetters({
    authLoading: 'auth/loading'
  })
}
</script>
