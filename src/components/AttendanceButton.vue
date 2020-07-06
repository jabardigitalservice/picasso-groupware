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
import { GroupwareAPI } from '../lib/axios'
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
      await GroupwareAPI.post('attendance/checkout', {
        date: new Date()
      })
      await this.$store.dispatch('checkins-list/getCheckinState')
    }
  }
}
</script>

<style>

</style>
