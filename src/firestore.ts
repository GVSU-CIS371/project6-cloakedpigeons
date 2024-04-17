// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhRGecghhb7B6CLoN8Ev0c-ouXjLUtMYY",
  authDomain: "cloaked-pigeons-project-6.firebaseapp.com",
  projectId: "cloaked-pigeons-project-6",
  storageBucket: "cloaked-pigeons-project-6.appspot.com",
  messagingSenderId: "716620840609",
  appId: "1:716620840609:web:026593d25895a3b0fafae0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);