// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-3b04a.firebaseapp.com",
  projectId: "mern-blog-3b04a",
  storageBucket: "mern-blog-3b04a.appspot.com",
  messagingSenderId: "355922554864",
  appId: "1:355922554864:web:a62ee919413a1250def735"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);