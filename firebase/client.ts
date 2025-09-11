
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBm2F1CYSC_oCRWSpleXR3qrrKYiAduy64",
  authDomain: "hirepath-715af.firebaseapp.com",
  projectId: "hirepath-715af",
  storageBucket: "hirepath-715af.firebasestorage.app",
  messagingSenderId: "326095429168",
  appId: "1:326095429168:web:58da0980298b3cac7d97f5",
  measurementId: "G-B73C1C8GF3"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);