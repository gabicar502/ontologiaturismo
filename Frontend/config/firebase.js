// Importaciones necesarias
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDoFNjBbHvQfxtDgt8QZpROLvsP3jdblWw",
  authDomain: "apiweb-f2f15.firebaseapp.com",
  projectId: "apiweb-f2f15",
  storageBucket: "apiweb-f2f15.firebasestorage.app",
  messagingSenderId: "641674613783",
  appId: "1:641674613783:web:deb0667466579a9d44f852",
  measurementId: "G-P0K2ZEZXXW"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa Auth y Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Exportaciones necesarias
export { app, auth, db };
