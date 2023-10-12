// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
//import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiuOqZ6LYLeRGS4Qt_KaxzDhxDRIrNSng",
  authDomain: "adopcion-mascotas-ef5c3.firebaseapp.com",
  projectId: "adopcion-mascotas-ef5c3",
  storageBucket: "adopcion-mascotas-ef5c3.appspot.com",
  messagingSenderId: "290530669663",
  appId: "1:290530669663:web:520a79692ed08926d4d7ea",
  measurementId: "G-M6W82RD559"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
//const analytics = getAnalytics(app);
