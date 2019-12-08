<template>
  <div class="select-none">
    <div class="bg-brand-green-dark h-10"></div>
    <div>
      <transition name="page" mode="out-in">
        <slot>
          <router-view />
        </slot>
      </transition>
    </div>
    <navbar></navbar>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>
