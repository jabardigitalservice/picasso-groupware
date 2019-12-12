/* eslint-disable */

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '867220352075'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

// const messaging = firebase.messaging();
//
// messaging.setBackgroundMessageHandler(function(payload) {
//   // console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: 'https://firebasestorage.googleapis.com/v0/b/sapajds.appspot.com/o/logo-jds.png?alt=media&token=4a2a095a-8257-46e9-8309-ce09788c50a5'
//   };
//
//   return self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });
