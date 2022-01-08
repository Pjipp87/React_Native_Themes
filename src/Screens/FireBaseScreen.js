// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr0AdmUxwNG86ducs0l0UoWNUMcUdxdKs",
  authDomain: "react-native-themes.firebaseapp.com",
  projectId: "react-native-themes",
  storageBucket: "react-native-themes.appspot.com",
  messagingSenderId: "129743817987",
  appId: "1:129743817987:web:cc31b9fb5d6fb167ba2d36",
  measurementId: "G-9GQKNPP0FX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

//******************************************************************************** */
