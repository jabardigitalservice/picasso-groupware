<template>
  <div class="max-w-md  m-2 mx-auto p-8 bg-white rounded-lg shadow-md">
    <h1 class="leading-loose text-xl font-bold">
      Login
    </h1>
    <br/>
    <LoginUsernamePassword
      @login:success="onLoginSuccess"
      @login:error="onLoginError"
    />
  </div>
</template>

<script>
import LoginUsernamePassword from '../components/LoginUsernamePassword'
export default {
  components: {
    LoginUsernamePassword
  },
  data () {
    return {
      referrer: null
    }
  },
  methods: {
    onLoginSuccess () {
      if (this.referrer) {
        this.$router.replace(this.referrer)
      } else {
        this.$router.replace('/')
      }
    },
    onLoginError (errorMessage) {
      this.$swal.fire({
        icon: 'error',
        title: 'Terjadi Kesalahan',
        text: errorMessage
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.referrer = from.path !== vm.$route.path ? from : null
    })
  }
}
</script>
