// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdieSxz9oniuB4JwWFLukekX1hiYSKIU0",
  authDomain: "react-cursos-22f65.firebaseapp.com",
  projectId: "react-cursos-22f65",
  storageBucket: "react-cursos-22f65.appspot.com",
  messagingSenderId: "391769964818",
  appId: "1:391769964818:web:fd077b05e15f1272e9f3cb",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
