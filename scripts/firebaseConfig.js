// Importar Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

// Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAvt2gcEF_LAcqjjGtscDVVXdsU7dFs2uc",
  authDomain: "sada-36b96.firebaseapp.com",
  projectId: "sada-36b96",
  storageBucket: "sada-36b96.firebasestorage.app",
  messagingSenderId: "998976500687",
  appId: "1:998976500687:web:ff3561018e141d391758ba"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app, "gs://materiales-sada-5af07.firebasestorage.app");