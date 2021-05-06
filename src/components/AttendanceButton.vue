<template>
  <div v-show="isCheckinButton || isCheckoutButton">
    <button
      :class="{
        'btn-attendance': true,
        'btn-attendance--checkin': isCheckinButton,
        'btn-attendance--checkout': isCheckoutButton,
        'btn-attendance--spinner': showSpinner
      }"
      @click="onClick">
    <img
      v-if="showSpinner"
      src="@/assets/loading.gif"
      class="inline-block w-auto object-contain object-center"
      style="height: 24px;">
    <span v-else>
      {{ buttonLabel }}
    </span>
  </button>
  </div>
</template>

<script>
import _result from 'lodash/result'

export default {
  data () {
    return {
      showSpinner: false
    }
  },
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
        this.showSpinner = true
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
      } finally {
        this.showSpinner = false
      }
      await this.$store.dispatch('users-dashboard/getDashboardReportUser')
      await this.$store.dispatch('checkins-list/getCheckinState', { refresh: true })
      await this.$store.dispatch('checkins-list/getCheckoutState', { refresh: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-attendance {
  @apply block w-full px-4 py-2 rounded text-white;

  &--checkin {
    @apply bg-green-600;

    &:hover {
      @apply bg-green-500;
    }
  }

  &--checkout {
    @apply bg-red-500;

    &:hover {
      @apply bg-red-400;
    }
  }

  &--spinner {
    @apply bg-white text-transparent;
  }

  &:focus,
  &:active {
    @apply outline-none;
  }
}
</style>
