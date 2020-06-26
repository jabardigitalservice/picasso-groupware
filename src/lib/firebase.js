import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
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
export const storage = firebase.storage()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint, FieldValue } = firebase.firestore
export { Timestamp, GeoPoint, FieldValue }

const messaging = null
export { messaging }

export const analytics = firebase.analytics()
