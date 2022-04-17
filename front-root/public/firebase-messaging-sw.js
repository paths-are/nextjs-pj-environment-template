importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
  apiKey: "AIzaSyDH6r-5P47nSAMF2e5MX9mG_jlP_GJijS0",
  authDomain: "nextjsprojecttemplate.firebaseapp.com",
  databaseURL: "https://nextjsprojecttemplate-default-rtdb.firebaseio.com",
  projectId: "nextjsprojecttemplate",
  storageBucket: "nextjsprojecttemplate.appspot.com",
  messagingSenderId: "797170251988",
  appId: "1:797170251988:web:8ce84d6ce93f62efbd2341",
  measurementId: "G-CMCNRE5YYG",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
