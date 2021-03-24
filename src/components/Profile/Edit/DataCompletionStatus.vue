<template>
  <div v-show="completionPercentage < 100">
    <transition enter-active-class="slide-y-fade-transition-enter-active"
                enter-class="slide-y-fade-transition-enter">
      <div  v-if="user && showStatus"
            class="px-4 py-8 sm:p-8">
        <h3 class="relative text-xl pr-12">
          Hai, <strong>{{user.name}}</strong>!
          <button class="appearance-none absolute right-0"
                  @click.capture="showStatus = false">
            <i aria-hidden="true" class="fas fa-times fa-lg text-gray-600 hover:text-red-400"></i>
          </button>
        </h3>
        <template v-if="completionPercentage >= 100">
          <p></p>
        </template>
        <template v-else-if="completionPercentage < 100">
          <div>
            <p class="text-lg text-gray-700 pr-12">
              Kelihatannya data kamu belum lengkap.<br class="hidden sm:block">
              Ayo lengkapi data kamu di
              <router-link  v-if="mode === 'redirect'"
                            to="/profile/edit/personal"
                            class="font-bold text-brand-blue hover:text-blue-900 hover:underline">sini</router-link>
              <span v-else>sini</span>
              &nbsp;&nbsp;<i aria-hidden="true" class="far fa-smile"></i>
            </p>
            <br>
            <figcaption class="max-w-sm">
              <caption class="block text-left italic text-gray-600">
                Seberapa lengkap data kamu?
              </caption>
              <div class="w-full flex flex-row items-center">
                <i  aria-hidden="true"
                    role="progress bar"
                    class="progress-bar flex-1"
                    :style="progressBarStyle">
                </i>
                <label class="progress-bar-label">
                  {{completionPercentage ? `${completionPercentage}%` : ''}}
                </label>
              </div>
            </figcaption>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import _get from 'lodash/get'
import _floor from 'lodash/floor'
import { PROFILE_DATA_SCHEMA } from './utils'

const SCHEMA_ENTRIES = Object.entries(PROFILE_DATA_SCHEMA)
const ALL_FIELDS_COUNT = SCHEMA_ENTRIES.reduce((sum, [datatype, fields]) => {
  sum = sum + fields.length
  return sum
}, 0)

export default {
  props: {
    mode: {
      type: String,
      default: 'default',
      validator: function (v) {
        return ['redirect', 'default'].includes(v)
      }
    }
  },
  data () {
    return {
      showStatus: false,
      completionPercentage: 0
    }
  },
  mounted () {
    this.$watch(
      function () {
        return this.$store.state['profile-detail'].item
      },
      function (obj) {
        if (obj) {
          this.processData(obj)
            .then(({ filled, unfilled, percentage }) => {
              this.showStatus = percentage < 100
              this.completionPercentage = percentage
            })
        }
      },
      { immediate: true, deep: false }
    )
  },
  computed: {
    user () {
      return this.$store.state['profile-detail'].item || null
    },
    progressBarStyle () {
      return {
        '--profile-completion': `${this.completionPercentage}%`
      }
    }
  },
  methods: {
    processData (existingData) {
      return new Promise(resolve => {
        if (existingData) {
          const fields = SCHEMA_ENTRIES.reduce(([filled, unfilled], [datatype, properties]) => {
            for (let prop of properties) {
              const ns = `${datatype}.${prop}`
              const existingVal = _get(existingData, ns)
              if (typeof existingVal === 'undefined' || existingVal === null) {
                unfilled.push(ns)
              } else {
                filled.push(ns)
              }
            }
            return [filled, unfilled]
          }, [[], []])

          const [filled, unfilled] = fields
          const ratio = filled.length / ALL_FIELDS_COUNT
          const percentage = _floor(ratio * 100, 0)
          resolve({
            filled,
            unfilled,
            percentage
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  @apply relative block flex justify-start items-center w-full h-2 rounded-full bg-gray-400 shadow;

  &::before {
    content: '';
    @supports (clip-path: inset(0 0 0 0)) {
      width: 100%;
      clip-path: inset(0px calc(100% - var(--profile-completion, 100%)) 0px 0px);
    }
    @supports not (clip-path: inset(0 0 0 0)) {
      width: var(--profile-completion, 100%);
    }
    background-color: #00c853;
    background-image: linear-gradient(to right, #00b0ff 0%, #00c853);
    @apply absolute top-0 left-0 bottom-0 inline-block rounded-full;
  }
}

.progress-bar-label {
  font-style: normal;
  @apply inline-block ml-4 text-gray-700 text-base font-bold leading-none;
}
</style>
