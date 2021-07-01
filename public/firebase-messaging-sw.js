/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
importScripts('vue-env.js')
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js')

let firebaseConfig
if (ENVERYWHERE_APP_MODE !== 'production') {
  firebaseConfig = JSON.parse(ENVERYWHERE_FIREBASE_CRED_STAGING)
} else {
  firebaseConfig = JSON.parse(ENVERYWHERE_FIREBASE_CRED)
}

firebase.initializeApp(firebaseConfig)

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging()
  messaging.setBackgroundMessageHandler(function (payload) {
    const notificationTitle = payload.notification.title
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/img/icons/android-chrome-192x192.png'
    }

    return self.registration.showNotification(notificationTitle,
      notificationOptions)
  })
}
