<template>
  <div>
    <button @click="signIn" class="login-with-google-button">
      <img src="/img/logo-google.svg" class="w-4 h-4 object-contain object-center mr-2">
      <strong>
        Login with Google
      </strong>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    signIn () {
      this.$store.dispatch('auth/login')
        .catch((e) => {
          let msg = 'Terjadi Kesalahan'
          if (e && e.response && e.response.data) {
            msg = e.response.data.errors.message
          }
          this.$swal.fire({
            icon: 'error',
            text: msg
          })
        })
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
