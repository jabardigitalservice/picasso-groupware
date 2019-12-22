import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyB2J4lGyL9MZNaUiRhmbCr3lfd2yT6fvHI',
  authDomain: 'sapajds.firebaseapp.com',
  databaseURL: 'https://sapajds.firebaseio.com',
  projectId: 'sapajds',
  storageBucket: 'sapajds.appspot.com',
  messagingSenderId: '867220352075',
  appId: '1:867220352075:web:dd6e33d19869652bfbb1ce',
  measurementId: 'G-9DQ4MEKRBE'
}

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

const messaging = firebase.messaging()
messaging.usePublicVapidKey('BL_nig-pnj8MoSA2R--XHCIAeKCZf2-_GDidutJIq1e5Q0p2Tem4aLGohU_3Roz8GT2A8aFAc8y2YsNXq2k5BFU')

export { messaging }

export const analytics = firebase.analytics()
