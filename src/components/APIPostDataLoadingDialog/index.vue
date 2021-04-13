<template>
  <div v-if="state === STATE.LOADING" class="dialog-loading">
    <img alt="Loading Icon" :src="assets.loading" />
    <p class="dialog-loading__text text-gray-500">
      Tunggu sebentar ya...
    </p>
  </div>
  <div v-else class="dialog-loading">
    <template v-if="state === STATE.SUCCESS">
      <img alt="Success Icon"  :src="assets.successMark" />
      <p class="dialog-loading__text text-green-600">
        <slot name="message-success">
          Data berhasil disimpan
        </slot>
      </p>
    </template>
    <template v-else-if="state === STATE.ERROR">
      <img alt="Error Icon"  :src="assets.crossMark" />
      <p class="dialog-loading__text text-red-600">
        Terjadi kesalahan
        <br />
        <small>
          <slot name="message-error"></slot>
        </small>
      </p>
    </template>
    <button class="dialog-loading__btn-close" @click="onClose">
      Tutup
    </button>
  </div>
</template>

<script>
const STATE = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

export default {
  components: {},
  props: {
    state: {
      type: String,
      validator: (v) => typeof v === 'string' &&
        [STATE.LOADING, STATE.SUCCESS, STATE.ERROR].includes(v),
      default: STATE.LOADING
    }
  },
  data () {
    return {
      STATE,
      assets: {
        loading: require('../../assets/loading.gif'),
        successMark: require('../../assets/checkmark.png'),
        crossMark: require('../../assets/crossmark.png')
      }
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-loading {
  @apply text-center;

  > img {
    @apply mb-8 mx-auto;
  }

  &__text {
    @apply text-xl font-bold;
  }

  &__btn-close {
    @apply w-full mt-8 px-4 py-2 rounded-lg
    border border-solid border-gray-600
    bg-gray-100
    text-gray-600;
  }
}
</style>
