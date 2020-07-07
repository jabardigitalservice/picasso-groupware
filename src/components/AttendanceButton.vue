<template>
  <div class="m-3">
    <button
      :class="{
        'block w-full px-4 py-2 rounded text-white': true,
        'bg-blue-500': isCheckinButton,
        'bg-red-500': isCheckoutButton
      }"
      @click="onClick">
    {{ buttonLabel }}
  </button>
  </div>
</template>

<script>
import _result from 'lodash/result'

export default {
  computed: {
    isCheckinState () {
      return this.$store.state['checkins-list'].isCheckin
    },
    isCheckinButton () {
      return this.isCheckinState === false
    },
    isCheckoutButton () {
      return this.isCheckinState === true
    },
    buttonLabel () {
      if (this.isCheckinButton) {
        return 'Checkin'
      } else if (this.isCheckoutButton) {
        return 'Checkout'
      }
      return null
    }
  },
  created () {
    this.$store.dispatch('checkins-list/getCheckinState')
  },
  methods: {
    onClick () {
      if (this.isCheckinButton) {
        return this.checkin()
      } else if (this.isCheckoutButton) {
        return this.checkout()
      }
    },
    checkin () {
      return this.$router.push({
        path: '/checkins/create'
      })
    },
    async checkout () {
      try {
        await this.$store.dispatch('checkins-list/checkout', {
          date: new Date()
        })
      } catch (e) {
        const message = _result(e, 'response.data.message') || _result(e, 'stack') || ''
        this.$swal.fire({
          icon: 'error',
          text: message,
          confirmButtonText: 'Tutup'
        })
      }
      await this.$store.dispatch('checkins-list/getCheckinState', { refresh: true })
    }
  }
}
</script>
