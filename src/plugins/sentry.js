import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing/esm/browser'

export default {
  install (Vue) {
    Sentry.init({
      Vue,
      dsn: process.env.VUE_APP_SENTRY_DSN,
      integrations: [
        new BrowserTracing()
      ],
      tracesSampleRate: parseFloat(process.env.VUE_APP_SENTRY_TRACE_SAMPLE_RATE),
      tracingOptions: {
        trackComponents: true
      }
    })
  }
}
