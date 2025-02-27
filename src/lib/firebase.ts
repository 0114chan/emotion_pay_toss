// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDclOBdCu9TF8OO4pa9Lrbust-g8sOKSK4",
    authDomain: "emotion-pay.firebaseapp.com",
    projectId: "emotion-pay",
    storageBucket: "emotion-pay.firebasestorage.app",
    messagingSenderId: "956933155071",
    appId: "1:956933155071:web:7283f061a3785d5a5d04ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);