
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
var config = {
    apiKey: "AIzaSyD78yBnVdg8-X3yg9RxFE8NK2dcXx8U03U",
    authDomain: "practice-d3859.firebaseapp.com",
    databaseURL: "https://practice-d3859.firebaseio.com",
    projectId: "practice-d3859",
    storageBucket: "practice-d3859.appspot.com",
    messagingSenderId: "1055768463348"
  };
  firebase.initializeApp(config);
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();





