<template>
  <div class="dayoff-detail">
    <template v-if="data">
      <strong class="text-green-600 text-lg leading-loose">{{ data.permits_type }}</strong>
      <br />
      <label>Dari</label>
      <p>{{ formattedStartDate }}</p>

      <label>Sampai</label>
      <p>{{ formattedStartDate }}</p>

      <label>Sudah konfirmasi ke</label>
      <p>
        <ul
          v-if="data.permit_acknowledged && data.permit_acknowledged.length"
          class="list-decimal list-inside">
          <li v-for="(ack, index) in data.permit_acknowledged" :key="index">
            {{ ack }}
          </li>
        </ul>
      </p>

      <label>Alasan</label>
      <p>{{ data.note || '-' }}</p>

      <label>Evidence</label>
      <img
        alt="Dayoff Evidence"
        :src="data.file_url"
        class="dayoff-detail__evidence"
        @click="onPreviewImage">
      <button class="dayoff-detail__btn-close" @click="onClose">
        Tutup
      </button>
    </template>
  </div>
</template>

<script>
import { formatDateLong } from '../../../lib/date'
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  computed: {
    formattedStartDate () {
      if (!this.data) {
        return ''
      }
      return formatDateLong(new Date(this.data.start_date))
    },
    formattedEndDate () {
      if (!this.data) {
        return ''
      }
      return formatDateLong(new Date(this.data.end_date))
    }
  },
  methods: {
    onPreviewImage () {
      if (window && this.data && this.data.file_url) {
        window.open(this.data.file_url, '_blank')
      }
    },
    onClose () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.dayoff-detail {
  > label {
    @apply font-bold text-sm text-gray-500;
  }

  > p {
    @apply mb-2
    text-base text-gray-800;
  }

  &__evidence {
    cursor: pointer;
    border: 1px solid #ddd;
    @apply rounded-lg
    w-full h-auto
    object-contain object-center;

    &:hover {
      @apply opacity-50;
    }
  }

  &__btn-close {
    @apply block max-w-xs w-full mx-auto
    mt-8 px-4 py-2
    border border-solid border-gray-600
    bg-gray-100 text-gray-700 rounded-lg;

    &:hover {
      @apply opacity-50;
    }
  }
}
</style>
