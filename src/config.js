export const isProduction = process.env.VUE_APP_MODE === 'production'

const firebaseEnvMap = [
  ['apiKey', 'VUE_APP_FIREBASE_API_KEY'],
  ['authDomain', 'VUE_APP_FIREBASE_AUTH_DOMAIN'],
  ['databaseURL', 'VUE_APP_FIREBASE_DB_URL'],
  ['projectId', 'VUE_APP_FIREBASE_PROJECT_ID'],
  ['storageBucket', 'VUE_APP_FIREBASE_STORAGE_BUCKET'],
  ['messagingSenderId', 'VUE_APP_FIREBASE_MESSAGING_SENDER_ID'],
  ['appId', 'VUE_APP_FIREBASE_APP_ID'],
  ['measurementId', 'VUE_APP_FIREBASE_MEASUREMENT_ID'],
  ['publicVapidKey', 'VUE_APP_FIREBASE_PUBLIC_VAPID_KEY']
]

export function getFirebaseConfig () {
  return firebaseEnvMap
    .reduce((obj, [configKey, envKey]) => {
      const value = isProduction
        ? process.env[envKey]
        : process.env[`${envKey}_STAGING`]

      Object.assign(obj, {
        [configKey]: value
      })
      return obj
    }, {})
}

export function getAxiosConfig () {
  let baseURL = isProduction
    ? process.env.VUE_APP_BASE_API_API
    : process.env.VUE_APP_BASE_API_API_STAGING

  return {
    baseURL
  }
}
