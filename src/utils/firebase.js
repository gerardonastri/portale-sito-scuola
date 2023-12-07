// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtvKTsHuB-2IZ6L0EEwFHfRhG7rmpArvo",
  authDomain: "sito-scuola-f8b7f.firebaseapp.com",
  projectId: "sito-scuola-f8b7f",
  storageBucket: "sito-scuola-f8b7f.appspot.com",
  messagingSenderId: "76398983165",
  appId: "1:76398983165:web:4dd527934a0ef66fa88b94",
  measurementId: "G-M94DZFJ9J7"
};

// const analytics = getAnalytics(app);


// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const storage = firebase.storage();
  export default storage