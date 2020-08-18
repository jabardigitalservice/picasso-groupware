<template>
  <div>
    <template v-if="data">
      <slot v-bind="{ data }"></slot>
    </template>
    <template v-if="isPending">
      <slot name="pending"></slot>
    </template>
    <template v-if="error">
      <slot
        name="error"
        v-bind="{ message: error }"
      ></slot>
    </template>
    <template v-else-if="hasNoMoreItemsToFetch">
      <slot
        name="end"
        v-bind="{ hasNoData, hasAtLeastOneData }"
      ></slot>
    </template>
    <div
      role="observerTarget"
      ref="observerTarget"
      class="mb-16 h-0 bg-gray-200 rounded"
    ></div>
  </div>
</template>

<script>
import makePromiseCancelable from '../lib/cancelable-promise'
import throttle from 'lodash/throttle'
export default {
  props: {
    immediate: {
      type: Boolean,
      default: false
    },
    dataSource: {
      type: [Function],
      required: true
    },
    perPage: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      isPending: false,
      error: null,
      data: null,
      currentPage: 0,
      hasNoMoreItemsToFetch: false,

      promiseCancelToken: null
    }
  },
  computed: {
    dataSourceContext () {
      return {
        currentPage: this.currentPage,
        perPage: this.perPage,
        intersectionObserver: null
      }
    },
    hasNoData () {
      return this.currentPage <= 1 && (!this.data || !this.data.length)
    },
    hasAtLeastOneData () {
      return this.currentPage >= 1 && !!this.data && !!this.data.length
    }
  },
  watch: {
    dataSourceContext: {
      immediate: true,
      handler (ctx) {
        this.$emit('change:context', ctx)
      }
    }
  },
  mounted () {
    this.$watch(
      'immediate',
      function handler (truthy) {
        if (truthy) {
          this.$nextTick(() => this.startObserving())
        }
      },
      { immediate: true }
    )
  },
  beforeDestroy () {
    this.stopObserving()
  },
  methods: {
    startObserving () {
      this.stopObserving()
      setTimeout(() => {
        this.checkIntersectionObserverSupport()
          .then(() => {
            this.useIntersectionObserver()
          })
          .catch(() => {
            this.useScrollListener()
          })
      }, 50)
    },
    stopObserving () {
      this.intersectionObserver = null
      this.removeWindowScrollListener()
    },
    checkIntersectionObserverSupport () {
      return new Promise((resolve, reject) => {
        if (IntersectionObserver) {
          resolve()
        } else {
          reject(new Error('intersection observer is not supported'))
        }
      })
    },
    useIntersectionObserver () {
      this.intersectionObserver = new IntersectionObserver(
        this.intersectionObserverCallback
      )
      this.intersectionObserver.observe(this.$refs.observerTarget)
    },
    intersectionObserverCallback (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.onFetchData()
        }
      })
    },
    useScrollListener () {
      this.getObservedTargetPosition()
      this.addWindowScrollListener()
    },
    addWindowScrollListener () {
      window.addEventListener('scroll', this.getObservedTargetPosition, {
        passive: true
      })
    },
    removeWindowScrollListener () {
      window.removeEventListener('scroll', this.getObservedTargetPosition, {
        passive: true
      })
    },
    getObservedTargetPosition: throttle(function () {
      const el = this.$refs.observerTarget
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight) {
          this.onFetchData()
        }
      }
    }, 1000 / 144),
    refresh () {
      this.isPending = false
      this.hasNoMoreItemsToFetch = false
      this.currentPage = 0
      this.error = null
      this.data = null
      this.$nextTick(() => {
        if (this.promiseCancelToken) {
          this.promiseCancelToken.cancel()
        }
        this.onFetchData()
      })
    },
    onFetchData () {
      if (this.isPending || this.hasNoMoreItemsToFetch) {
        return
      }
      this.currentPage += 1
      this.isPending = true
      this.error = null
      let promise
      if (typeof this.dataSource === 'function') {
        ;[promise, this.promiseCancelToken] = makePromiseCancelable(
          this.dataSource(this.dataSourceContext)
        )
      }

      if (!promise || !promise.then || !promise.catch || !promise.finally) {
        throw new TypeError(
          'LazyListDataProvider: dataSource must be an instance of Promise or a function that returns Promise'
        )
      }
      return promise
        .then((data) => {
          this.hasNoMoreItemsToFetch =
            !data ||
            !data.length ||
            (this.currentPage === 1 && data.length < this.perPage)
          this.data = Array.isArray(this.data)
            ? [...this.data, ...data]
            : [...data]
          this.startObserving()
        })
        .catch((e) => {
          if (e && !e.isCanceled) {
            this.error = e
          }
        })
        .finally(() => {
          this.isPending = false
        })
    }
  }
}
</script>
