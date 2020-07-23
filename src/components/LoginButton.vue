<template>
  <div>
    <button @click="signIn" class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded">Login</button>
  </div>
</template>

<script>
export default {
  methods: {
    signIn () {
      this.$router.push('/login')
    }
  }
}
</script>
