import { auth } from "./firebaseConfig.js";

const userNameSpan = document.getElementById("user-name");
const moduleFrame = document.getElementById("module-frame");
const navLinks = document.querySelectorAll(".navbar a");
const accountLink = document.getElementById("account-link");
const logoutButton = document.getElementById("logout-button");

// Mostrar el nombre del usuario
auth.onAuthStateChanged((user) => {
    userNameSpan.textContent = user.email || "Usuario";
});

// Cambiar el contenido según el enlace clickeado
navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const page = link.dataset.page;

        // Actualizar el iframe con la nueva página
        moduleFrame.src = `/screens/${page}`;

        // Resaltar el enlace activo
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
