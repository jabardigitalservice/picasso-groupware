<template>
  <Card class="dayoff-card" @click.capture.native="onGoToDetail">
    <template v-if="item">
      <span class="dayoff-card__index">
        {{ index + 1 }}.
      </span>
      <div>
        <h6 class="dayoff-card__permit-type">
          {{ item.permits_type  }}
        </h6>
        <template v-if="!isSameDayStartAndEndDate">
          <p class="dayoff-card__date">
            {{ formattedStartDate }}
          </p>
          <p class="dayoff-card__date">
            {{ formattedEndDate }}
          </p>
        </template>
        <template v-else>
          <p class="dayoff-card__date">
            {{ formattedDate }}
          </p>
        </template>
        <p class="mt-4">
          {{ item.note }}
        </p>
      </div>
      <div class="dayoff-card__chevron-right">
        <svg
            version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="100%" height="100%" viewBox="0 0 444.819 444.819" style="enable-background:new 0 0 444.819 444.819;"
            xml:space="preserve">
          <g>
            <path d="M352.025,196.712L165.884,10.848C159.029,3.615,150.469,0,140.187,0c-10.282,0-18.842,3.619-25.697,10.848L92.792,32.264
              c-7.044,7.043-10.566,15.604-10.566,25.692c0,9.897,3.521,18.56,10.566,25.981l138.753,138.473L92.786,361.168
              c-7.042,7.043-10.564,15.604-10.564,25.693c0,9.896,3.521,18.562,10.564,25.98l21.7,21.413
              c7.043,7.043,15.612,10.564,25.697,10.564c10.089,0,18.656-3.521,25.697-10.564l186.145-185.864
              c7.046-7.423,10.571-16.084,10.571-25.981C362.597,212.321,359.071,203.755,352.025,196.712z"/>
          </g>
        </svg>
      </div>
    </template>
  </Card>
</template>

<script>
import isSameDay from 'date-fns/isSameDay'
import { formatDateLong } from '../../../lib/date'
import Card from '../../Card'

export default {
  components: {
    Card
  },
  props: {
    index: {
      type: [String, Number],
      default: null
    },
    item: {
      type: Object,
      default: null
    }
  },
  computed: {
    isSameDayStartAndEndDate () {
      if (!this.item) {
        return false
      }
      return isSameDay(new Date(this.item.start_date), new Date(this.item.end_date))
    },
    formattedDate () {
      return formatDateLong(new Date(this.item.start_date))
    },
    formattedStartDate () {
      if (!this.item) {
        return ''
      }
      const date = formatDateLong(new Date(this.item.start_date))
      return `Dari ${date}`
    },
    formattedEndDate () {
      if (!this.item) {
        return ''
      }
      const date = formatDateLong(new Date(this.item.end_date))
      return `Sampai ${date}`
    }
  },
  methods: {
    onGoToDetail () {
      if (!this.item || !this.item._id) {
        return ''
      }
      this.$store.commit('dayoff-list/keepItemInCache', {
        id: this.item._id,
        item: this.item
      })
      return this.$router.push({
        path: `/dayoff/${this.item._id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dayoff-card {
  cursor: pointer;
  display: grid;
  grid-template-columns: 3ch auto 1rem;
  gap: 1rem;
  align-items: center;

  &:hover {
    @apply bg-gray-100 opacity-50;
  }

  &__index {
    @apply text-xl text-gray-600;
  }

  &__permit-type {
    @apply text-xl font-bold leading-loose;
  }

  &__date {
    @apply text-sm text-gray-700;
  }

  &__chevron-right {
    @apply w-full h-4;
  }
}
</style>
