// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "recipe-finder-19685.firebaseapp.com",
  projectId: "recipe-finder-19685",
  storageBucket: "recipe-finder-19685.appspot.com",
  messagingSenderId: "840192898001",
  appId: "1:840192898001:web:38d25c5858714f335426f0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);