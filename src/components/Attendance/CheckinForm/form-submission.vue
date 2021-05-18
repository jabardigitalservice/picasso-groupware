<template>
  <div class="checkin-confirmation">
    <template v-if="!isFormSubmitted">
      <div v-if="payload" class="checkin-confirmation__body">
        <h3 class="text-xl font-bold">
          Konfirmasi Checkin
        </h3>
        <p class="mb-3">
          Yuk cek lagi data checkin kamu hari ini.
        </p>
        <strong class="text-green-600 text-lg">Hadir ({{ payload.location }})</strong>
        <br />
        <label>Tanggal</label>
        <p>{{ formatDateLong(payload.date) }}</p>

        <label>Jam Hadir</label>
        <p>{{ formatTime(payload.date) }}</p>

        <label>Mood</label>
        <i
          aria-hidden="true"
          class="block w-12 my-2">
          <component
            :is="moodComponent"
            :animate="true" />
        </i>

        <label>Catatan</label>
        <p>{{ payload.note || '-' }}</p>
      </div>
      <div class="checkin-confirmation__actions">
          <button class="checkin-confirmation__btn btn-confirm" @click="onSubmit">
            Sudah Benar
          </button>
          <button class="checkin-confirmation__btn btn-cancel" @click="onEditData">
            Edit Lagi
          </button>
      </div>
    </template>
    <template v-else>
      <div class="checkin-confirmation__body">
        <APIPostDataLoadingDialog v-if="isFormSubmitted" :state="formSubmissionStatus" @close="onClose">
          <template #message-error>
            {{ formSubmissionError }}
          </template>
        </APIPostDataLoadingDialog>
      </div>
    </template>
  </div>
</template>

<script>
import pMinDelay from 'p-min-delay'
import { GroupwareAPI } from '../../../lib/axios'
import { formatDateLong, formatTime } from '../../../lib/date'
import { moods } from '../../Reactions'

const STATUS = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

export default {
  components: {
    APIPostDataLoadingDialog: () => import('../../APIPostDataLoadingDialog')
  },
  props: {
    payload: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      STATUS,
      isFormSubmitted: false,
      formSubmissionStatus: null,
      formSubmissionError: null
    }
  },
  computed: {
    // format payload as required
    formattedPayload () {
      const { date, ...rest } = this.payload
      const payload = Object.assign({}, rest, {
        date: date instanceof Date ? date.toISOString() : null
      })
      return payload
    },
    moodComponent () {
      const { mood } = this.payload
      const matched = moods.find((m) => m.value === mood)
      return matched ? matched.component : null
    }
  },
  methods: {
    formatDateLong: date => date ? formatDateLong(date, 'eeee, PPP') : null,
    formatTime: time => time ? formatTime(time) : null,

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
        const post = GroupwareAPI.post('attendance/checkin', this.payload)
        await pMinDelay(post, 1500)
        await this.$store.dispatch('checkins-list/getCheckinState', { refresh: true })
        await this.$store.dispatch('checkins-list/getCheckoutState', { refresh: true })
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
      if (err.response) {
        this.formSubmissionError = err.response.data.message
      } else if (err instanceof Error) {
        this.formSubmissionError = err.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkin-confirmation {
  @apply flex flex-col overflow-hidden max-h-full;

  &__body {
    @apply flex-1 p-4 overflow-y-auto;

    > label {
      @apply font-bold text-sm text-gray-500;
    }

    > p {
      @apply mb-2
      text-base text-gray-800;
    }
  }

  &__actions {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    box-shadow: 0 -4px 16px 0 rgba(0,0,0,0.1);
    @apply relative z-10
    flex-none
    mt-4 p-4;

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
