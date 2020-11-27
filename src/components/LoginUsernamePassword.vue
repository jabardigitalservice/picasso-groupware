<template>
  <ValidationObserver
    tag="div"
    :slim="false"
    #default="{ errors, handleSubmit }"
  >
    <form @submit.prevent="handleSubmit(onSubmit)">
      <FormInput
        name="username"
        title="Username"
        type="text"
        v-model="payload.username"
        rules="required"
        :custom-messages="{
          required: 'Username harus diisi'
        }"
      />
      <br/>
      <div class="relative">
        <FormInput
          name="password"
          title="Password"
          :type="showPassword ? 'text' : 'password'"
          v-model="payload.password"
          rules="required"
          :custom-messages="{
            required: 'Password harus diisi'
          }"
        />
      </div>
      <br />
      <div class="flex justify-end">
        <button
          type="submit"
          :class="[
            'appearance-none px-8 py-2 text-white rounded-md',
            hasError(errors) || isPayloadEmpty
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-brand-green hover:bg-brand-green-light'
          ]"
        >
          Login
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import FormInput from './Form/Input'
export default {
  components: {
    FormInput
  },
  data () {
    return {
      showPassword: false,
      payload: {
        username: null,
        password: null
      }
    }
  },
  computed: {
    isPayloadEmpty () {
      return Object.values(this.payload).some(x => !x)
    }
  },
  methods: {
    hasError (errors) {
      if (typeof errors === 'object' && errors) {
        return Object.values(errors).some(arr => Array.isArray(arr) && arr.length)
      }
    },
    onSubmit () {
      this.$store.dispatch('auth/loginUsingUsernameAndPassword', this.payload)
        .then(() => {
          this.$emit('login:success')
        })
        .catch((err) => {
          let msg
          if ('response' in err) {
            msg = `${err.response.status}: ${err.response.data.detail}`
          } else if (err instanceof Error) {
            msg = err.message
          }
          this.$emit('login:error', msg)
        })
    }
  }
}
</script>
