// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDjr0fBw9g9mzIuWjagXTgDFzY54mPy7Zk",
  authDomain: "funchat-e6fd6.firebaseapp.com",
  projectId: "funchat-e6fd6",
  storageBucket: "funchat-e6fd6.appspot.com",
  messagingSenderId: "748405797492",
  appId: "1:748405797492:web:394848e1b785da8bb45721",
  measurementId: "G-QMC3J34194",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
