// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDgmRlaBNZv8f42tWHMjlOvar1GJSKdzRA",
  authDomain: "sito-scuola-81c87.firebaseapp.com",
  projectId: "sito-scuola-81c87",
  storageBucket: "sito-scuola-81c87.appspot.com",
  messagingSenderId: "833463174744",
  appId: "1:833463174744:web:afeef669d5bc13bd1dac2d",
  measurementId: "G-D8S8K217MY"
};



// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const storage = firebase.storage();
  export default storage