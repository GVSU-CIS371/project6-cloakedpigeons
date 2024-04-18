import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { fa } from "vuetify/iconsets/fa";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "./router";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi, fa },
  },

  components,
  directives,
});
const pinia = createPinia();
createApp(App).use(vuetify).use(pinia).use(router).mount("#app");

// FIREBASE SETUP
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXmxqAHOxGKHwGaNJo7zGGbsI7JefUbJo",
  authDomain: "cis371-project6-71871.firebaseapp.com",
  projectId: "cis371-project6-71871",
  storageBucket: "cis371-project6-71871.appspot.com",
  messagingSenderId: "121957581926",
  appId: "1:121957581926:web:8c47147b6bd27a649959a7",
  measurementId: "G-0CXFNSEVHW"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//const myapp: FirebaseApp = initializeApp(firebaseConfig);
//const db: Firestore = getFirestore(myapp);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {app, db}