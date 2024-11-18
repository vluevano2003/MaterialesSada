// Importar Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

// Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBLzY7Ceh2UljhXCWJ7gSTGbqEn83AWEwo",
  authDomain: "materiales-sada-5af07.firebaseapp.com",
  projectId: "materiales-sada-5af07",
  storageBucket: "materiales-sada-5af07.appspot.com",
  messagingSenderId: "459233219482",
  appId: "1:459233219482:web:75dfebc75db0b848b52023",
  measurementId: "G-LPC1CK8ESR",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);