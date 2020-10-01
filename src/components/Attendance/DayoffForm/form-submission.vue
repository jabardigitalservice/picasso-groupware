<template>
  <div class="dayoff-confirmation">
    <template v-if="!isFormSubmitted">
      <div v-if="payload" class="dayoff-confirmation__body">
        <h3 class="text-xl font-bold">
          Konfirmasi Izin
        </h3>
        <p>
          Yuk cek lagi data izin kamu hari ini.
        </p>
        <strong class="text-green-600 text-lg leading-loose">{{ payload.permitsType }}</strong>
        <br />
        <label>Dari</label>
        <p>{{ formatDateLong(payload.startDate) }}</p>

        <label>Sampai</label>
        <p>{{ formatDateLong(payload.endDate) }}</p>

        <label>Sudah konfirmasi ke</label>
        <p>
          <ul
            v-if="payload.permitAcknowledged && payload.permitAcknowledged.length"
            class="list-decimal list-inside">
            <li v-for="(sh, index) in payload.permitAcknowledged" :key="index">
              {{ sh }}
            </li>
          </ul>
        </p>

        <label>Alasan</label>
        <p>{{ payload.note || '-' }}</p>

        <label>Evidence</label>
        <img :src="payload.imageURL" class="dayoff-confirmation__evidence" @click="onPreviewImage">
      </div>
      <div class="dayoff-confirmation__actions">
        <button class="dayoff-confirmation__btn btn-confirm" @click="onSubmit">
          Sudah Benar
        </button>
        <button class="dayoff-confirmation__btn btn-cancel" @click="onEditData">
          Edit Lagi
        </button>
      </div>
    </template>
    <template v-else>
      <div class="dayoff-confirmation__body">
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
import mapKeys from 'lodash/mapKeys'
import snakeCase from 'lodash/snakeCase'
import { GroupwareAPI } from '../../../lib/axios'
import { formatDateLong } from '../../../lib/date'

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
  computed: {
    // format payload as required
    formattedPayload () {
      // remove `imageFile` and `imageURL` fields from payload
      // convert permitAcknowledged string[] to string with comma delimiter
      const { imageFile, imageURL, permitAcknowledged, startDate, endDate, ...rest } = this.payload

      const payload = Object.assign({}, rest, {
        // assign `imageFile` value to `file` field
        file: imageFile,
        startDate: startDate instanceof Date ? startDate.toISOString() : null,
        endDate: endDate instanceof Date ? endDate.toISOString() : null,
        permitAcknowledged: Array.isArray(permitAcknowledged) ? permitAcknowledged.join(',') : null
      })

      // convert to snakecase
      return mapKeys(payload, (value, key) => snakeCase(key))
    }
  },
  methods: {
    formatDateLong (date) {
      return date ? formatDateLong(date) : null
    },

    onPreviewImage () {
      if (window && this.payload.imageURL) {
        window.open(this.payload.imageURL, '_blank')
      }
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
        const post = GroupwareAPI.post('day-off/create', this.formattedPayload)
        await pMinDelay(post, 1500)
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
.dayoff-confirmation {
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

  &__evidence {
    cursor: pointer;
    max-width: 320px;
    border: 1px solid #ddd;
    @apply rounded-lg
    object-contain object-center;

    &:hover {
      @apply opacity-50;
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
