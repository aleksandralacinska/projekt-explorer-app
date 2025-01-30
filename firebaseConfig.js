import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC09RHYaj4JDbeIKMhkit1Gs3lFoXm7m5s",
    authDomain: "projekt-explorer-app.firebaseapp.com",
    projectId: "projekt-explorer-app",
    storageBucket: "projekt-explorer-app.firebasestorage.app",
    messagingSenderId: "455144339787",
    appId: "1:455144339787:web:2e895462b82797959110ce",
    measurementId: "G-KB1EGVMLHY"
  };

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };