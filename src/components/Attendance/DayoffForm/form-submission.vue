<template>
  <div>
    <template v-if="!isFormSubmitted">
      <h3 class="text-xl font-bold">
        Konfirmasi Izin
      </h3>
      <br />
      <p>
        Yuk cek lagi data izin kamu hari ini.
      </p>
      <template v-if="payload">
        <div class="dayoff-confirmation">
          <br />
          <strong class="text-green-600 text-lg">{{ payload.type }}</strong>
          <br />
          <label>Dari</label>
          <p>{{ formatDateLong(payload.startDate) }}</p>

          <label>Sampai</label>
          <p>{{ formatDateLong(payload.endDate) }}</p>

          <label>Sudah konfirmasi ke</label>
          <p>
            <ul
              v-if="payload.stakeholders && payload.stakeholders.length"
              class="list-decimal list-inside">
              <li v-for="(sh, index) in payload.stakeholders" :key="index">
                {{ sh }}
              </li>
            </ul>
          </p>

          <label>Alasan</label>
          <p>{{ payload.reason || '-' }}</p>
        </div>
      </template>
      <div class="dayoff-confirmation__actions">
          <button class="dayoff-confirmation__btn btn-confirm" @click="onSubmit">
            Sudah Benar
          </button>
          <button class="dayoff-confirmation__btn btn-cancel" @click="onEditData">
            Edit Lagi
          </button>
      </div>
    </template>
    <APILoadingPrompt v-if="isFormSubmitted" :state="formSubmissionStatus" @close="onClose"/>
  </div>
</template>

<script>
// import { GroupwareAPI } from '../../../lib/axios'
import { formatDateLong } from '../../../lib/date'

const STATUS = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

export default {
  components: {
    APILoadingPrompt: () => import('../../APILoadingPrompt')
  },
  props: {
    payload: {
      type: Object
    }
  },
  data () {
    return {
      isFormSubmitted: false,
      formSubmissionStatus: null,
      formSubmissionError: null
    }
  },
  methods: {
    formatDateLong (date) {
      return date ? formatDateLong(date) : null
    },

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
      this.formSubmissionStatus = STATUS.LOADING
      this.formSubmissionError = null
      this.isFormSubmitted = true
      try {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
          }, 5000)
        })
        // await GroupwareAPI.post('attendance/checkin', this.payload)
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
.dayoff-confirmation {
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
