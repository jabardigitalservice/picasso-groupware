<template>
  <div>
    <template v-if="!isFormSubmitted">
      <h3 class="text-xl font-bold">
        Konfirmasi Checkin
      </h3>
      <br />
      <p>
        Yuk cek lagi data checkin kamu hari ini.
      </p>
      <template v-if="payload">
        <div class="checkin-confirmation">
          <br />
          <strong class="text-green-600 text-lg">Hadir</strong>
          <br />
          <label>Tanggal</label>
          <p>{{ formatDateLong(payload.date) }}</p>

          <label>Jam Hadir</label>
          <p>{{ formatTime(payload.date) }}</p>

          <label>Catatan</label>
          <p>{{ payload.note || '-' }}</p>
        </div>
      </template>
      <div class="checkin-confirmation__actions">
          <button class="checkin-confirmation__btn btn-confirm" @click="onSubmit">
            Sudah Benar
          </button>
          <button class="checkin-confirmation__btn btn-cancel" @click="onEditData">
            Edit Lagi
          </button>
      </div>
    </template>
    <div v-else-if="isFormSubmitted && !formSubmissionStatus" class="submit-status">
      <img :src="assets.loading" />
      <p class="submit-status__text text-gray-500">
        Tunggu sebentar ya...
      </p>
    </div>
    <div v-else-if="isFormSubmitted && formSubmissionStatus" class="submit-status">
      <template v-if="formSubmissionStatus === STATUS.SUCCESS">
        <img :src="assets.successMark" />
        <p class="submit-status__text text-green-600">
          Data berhasil disimpan
        </p>
      </template>
      <template v-else-if="formSubmissionStatus === STATUS.ERROR">
        <img :src="assets.crossMark" />
        <p class="submit-status__text text-red-600">
          Terjadi kesalahan
          <br />
          <span v-if="formSubmissionError">
            {{ formSubmissionError }}
          </span>
        </p>
      </template>
      <button class="submit-status__btn-close" @click="onClose">
        Tutup
      </button>
    </div>
  </div>
</template>

<script>
import { GroupwareAPI } from '../../../lib/axios'
import { formatDateLong, formatTime } from '../../../lib/date'

const STATUS = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

export default {
  props: {
    payload: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      STATUS,
      assets: {
        loading: require('../../../assets/loading.gif'),
        successMark: require('../../../assets/checkmark.png'),
        crossMark: require('../../../assets/crossmark.png')
      },
      isFormSubmitted: false,
      formSubmissionStatus: null,
      formSubmissionError: null
    }
  },
  methods: {
    formatDateLong: date => formatDateLong(date, 'eeee, PPP'),
    formatTime,

    onEditData () {
      this.$emit('cancel')
    },
    onClose () {
      if (this.isFormSubmitted) {
        switch (this.formSubmissionStatus) {
          case STATUS.SUCCESS: return this.$emit('success')
          case STATUS.ERROR: return this.$emit('error', this.formSubmissionError)
          default: break
        }
      } else {
        this.$emit('close')
      }
    },
    async onSubmit () {
      this.formSubmissionStatus = null
      this.formSubmissionError = null
      this.isFormSubmitted = true
      try {
        await GroupwareAPI.post('attendance/checkin', this.payload)
        await this.onSubmitSuccess()
      } catch (e) {
        await this.onSubmitError(e)
      }
    },
    async onSubmitSuccess () {
      this.formSubmissionStatus = STATUS.SUCCESS
    },
    async onSubmitError (err) {
      this.formSubmissionStatus = STATUS.ERROR
      this.formSubmissionError = err instanceof Error ? err.message : err
    }
  }
}
</script>

<style lang="scss" scoped>
.checkin-confirmation {
  > label {
    @apply font-bold text-sm text-gray-500;
  }

  > p {
    @apply mb-2
    text-base text-gray-800;
  }

  &__actions {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    @apply mt-6;

    @screen md {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__btn {
    border-color: currentColor;
    @apply px-4 py-2 rounded
    border border-solid;

    &.btn-confirm {
      @apply bg-blue-600 text-white;
    }

    &.btn-cancel {
      @apply bg-white text-blue-600;
    }
  }
}

.submit-status {
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
