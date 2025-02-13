// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRIBASE_API_KEY ,
  authDomain: "mern-estate-1965a.firebaseapp.com",
  projectId: "mern-estate-1965a",
  storageBucket: "mern-estate-1965a.firebasestorage.app",
  messagingSenderId: "347021210513",
  appId: "1:347021210513:web:80c21dddde7dcd60302030",
  measurementId: "G-NQ79YSEFBT"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);