import { auth, db } from "./firebaseConfig.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const userNameSpan = document.getElementById("user-name");
const moduleFrame = document.getElementById("module-frame");
const navLinks = document.querySelectorAll(".navbar a");
const accountLink = document.getElementById("account-link");
const logoutButton = document.getElementById("logout-button");
const usersLink = document.getElementById("users-link"); // Enlace de gestión de usuarios

// Verificar el tipo de cuenta
auth.onAuthStateChanged(async (user) => {
    if (user) {
        userNameSpan.textContent = user.email;
        const userRef = doc(db, "Usuarios", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Verificar si es un empleado o admin 
            if (userData.tipoCuenta === "empleado") {
                usersLink.style.display = "none";
                // Si se intenta acceder directamente al módulo de usuario siendo empelado se redirige al inventario
                if (window.location.pathname.includes("usuarios.html")) {
                    window.location.href = "/screens/inventario.html";
                }
            }
        }
    } else {
        userNameSpan.textContent = "Usuario";
    }
});

// Cambiar el contenido según el enlace clickeado
navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const page = link.dataset.page;

        // Actualizar el iframe con la nueva página
        moduleFrame.src = `/screens/${page}`;
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
    });
});

accountLink.addEventListener("click", () => {
    moduleFrame.src = "/screens/cuenta.html";
    navLinks.forEach((l) => l.classList.remove("active"));
});

// Función para cerrar sesión
logoutButton.addEventListener("click", async () => {
    try {
        await auth.signOut();
        window.location.href = "/screens/login.html";
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert("Hubo un problema al cerrar sesión. Intenta nuevamente.");
    }
});
