<template>
  <div>
    <button @click="signIn" class="login-with-google-button">
      <img src="/img/logo-google.svg" class="w-4 h-4 object-contain object-center mr-2">
      <b>
        Login with Google
      </b>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    signIn () {
      this.$store.dispatch('auth/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-with-google-button {
  @apply
  w-full
  flex flex-no-wrap justify-center items-center
  border border-solid border-gray-300
  bg-white
  text-gray-600
  shadow
  py-2 px-4 rounded;
}
</style>
