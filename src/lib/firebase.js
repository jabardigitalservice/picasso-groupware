import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/analytics'

import { firebaseConfig } from '@/config'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Get a Firestore instance
firebase.firestore().enablePersistence().catch(() => {
  //
})

export const db = firebase.firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint, FieldValue } = firebase.firestore
export { TimeStamp, GeoPoint, FieldValue }

let messaging = null

if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging()
  messaging.usePublicVapidKey(firebaseConfig.publicVapidKey)
}

export { messaging }

export const analytics = firebase.analytics()
