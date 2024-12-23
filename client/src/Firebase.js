// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nestland-estate.firebaseapp.com",
  projectId: "nestland-estate",
  storageBucket: "nestland-estate.firebasestorage.app",
  messagingSenderId: "984697992712",
  appId: "1:984697992712:web:02401ac656c223bf0283bd"
};

console.log(import.meta.env.VITE_FIREBASE_API_KEY)
// Initialize Firebase
 export const app = initializeApp(firebaseConfig);