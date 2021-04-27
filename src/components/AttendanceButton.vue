<template>
  <div v-show="isCheckinButton || isCheckoutButton">
    <button
      :class="{
        'block w-full px-4 py-2 rounded text-white': true,
        'bg-green-600 hover:bg-green-500': isCheckinButton,
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
    isCheckoutState () {
      return this.$store.state['checkins-list'].isCheckout
    },
    isCheckinButton () {
      if (this.isCheckoutState) {
        return false
      }
      return this.isCheckinState === false || (
        this.isCheckinState === true &&
        this.isCheckoutState === true
      )
    },
    isCheckoutButton () {
      return this.isCheckinState === true && this.isCheckoutState === false
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
  async created () {
    await this.$store.dispatch('checkins-list/getCheckinState')
    await this.$store.dispatch('checkins-list/getCheckoutState')
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
      const { value: confirm } = await this.$swal.fire({
        text: 'Apa kamu yakin untuk checkout sekarang?',
        icon: 'question',
        confirmButtonText: 'Ya, checkout sekarang',
        cancelButtonText: 'Tidak',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#808080',
        cancelButtonColor: 'blue'
      })
      if (!confirm) {
        return
      }
      try {
        await this.$store.dispatch('checkins-list/checkout', {
          date: new Date()
        })
        await this.$swal.fire({
          icon: 'success',
          title: 'Terimakasih buat kontribusinya hari ini ya',
          confirmButtonText: 'OK'
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
      await this.$store.dispatch('checkins-list/getCheckoutState', { refresh: true })
    }
  }
}
</script>
