<template>
  <div class="select-none">
    <div class="bg-brand-green-dark mb-8">
      <div class="container mx-auto px-4">
        <div class="relative bg-white mx-auto max-w-sm shadow rounded-lg overflow-hidden" style="top: 20px">
          <div class="flex px-6 py-4">
            <img class="block h-10 mx-auto mr-4" src="@/assets/logo.png" alt>
            <div class="text-left flex-grow">
              <p class="text-sm leading-normal">Groupware</p>
              <p class="text-sm text-gray-600">Jabar Digital Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    this.$store.dispatch('events-list/fetchItems')
    this.$store.dispatch('thankyou-list/fetchItems')
  }
}
</script>
