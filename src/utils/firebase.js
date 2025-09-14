// frontend/src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpUA7ZILDPAmGkUSjhkjpE3D_S1ftvPkE",
  authDomain: "weekendly-a0f46.firebaseapp.com",
  projectId: "weekendly-a0f46",
  storageBucket: "weekendly-a0f46.appspot.com",
  messagingSenderId: "452297990413",
  appId: "1:452297990413:web:d1b45bde48c9b25404d044",
  measurementId: "G-N5QJY997PH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 🟢 Enable Firestore offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  console.error("⚠️ Firestore offline persistence error:", err.code);
});

export { app, db, auth };
