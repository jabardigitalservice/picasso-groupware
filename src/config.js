export const appConfig = {
  version: process.env.VUE_APP_VERSION
}

const map = [
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

const mapToObject = ({ isStaging = true } = {}) => map.reduce((obj, [configKey, envKey]) => {
  const value = isStaging ? process.env[`${envKey}_STAGING`] : process.env[envKey]
  Object.assign(obj, {
    [configKey]: value
  })
  return obj
}, {})

export function getFirebaseConfig () {
  if (process.env.VUE_APP_MODE !== 'production') {
    return mapToObject({
      isStaging: true
    })
  }
  return mapToObject()
}
