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
      >
        <template #title>
          <span class="text-sm text-gray-800">
            Username
          </span>
        </template>
      </FormInput>
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
        >
          <template #title>
            <span class="text-sm text-gray-800">
              Password
            </span>
          </template>
        </FormInput>
      </div>
      <br />
      <div class="flex justify-end">
        <button
          type="submit"
          :class="{
            'btn-login-uname-pwd': true,
            'is-error': hasError(errors),
            'is-disabled': isPayloadEmpty,
            'is-pending': isPending
          }"
        >
          <img
            v-if="isPending"
            src="@/assets/loading.gif"
            class="inline-block w-auto object-contain object-center"
            style="height: 24px;">
          <span v-else>
            Login
          </span>
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
      isPending: false,
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
      this.isPending = true
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
        .finally(() => {
          this.isPending = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-login-uname-pwd {
  @apply appearance-none
  w-full px-8 py-2
  border border-solid border-gray-300
  rounded
  text-center
  shadow;

  &.is-error,
  &.is-disabled {
    @apply text-white cursor-not-allowed bg-gray-400;
  }

  &.is-pending {
    @apply bg-white text-transparent;
  }

  &:not(.is-error):not(.is-disabled):not(.is-pending) {
    @apply text-white bg-brand-green-darker;

    &:hover {
      @apply bg-brand-green-light;
    }
  }

  &:focus,
  &:active {
    @apply outline-none;
  }
}
</style>
