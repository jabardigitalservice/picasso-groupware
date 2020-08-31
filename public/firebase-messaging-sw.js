/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js')

firebase.initializeApp({
  // apiKey: 'AIzaSyB2J4lGyL9MZNaUiRhmbCr3lfd2yT6fvHI',
  // authDomain: 'sapajds.firebaseapp.com',
  // databaseURL: 'https://sapajds.firebaseio.com',
  // projectId: 'sapajds',
  // storageBucket: 'sapajds.appspot.com',
  messagingSenderId: '867220352075'
  // appId: '1:867220352075:web:dd6e33d19869652bfbb1ce',
  // measurementId: 'G-9DQ4MEKRBE'
})

const messaging = firebase.messaging()

// messaging.setBackgroundMessageHandler(function (payload) {
//   const notificationTitle = payload.notification.title
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/img/icons/android-chrome-192x192.png'
//   }

//   return self.registration.showNotification(notificationTitle,
//     notificationOptions)
// })
