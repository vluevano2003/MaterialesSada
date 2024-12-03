import { auth } from "./firebaseConfig.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const db = getFirestore();
const generalForm = document.getElementById("general-form");
const passwordForm = document.getElementById("password-form");
const messageDiv = document.getElementById("message");

auth.onAuthStateChanged(async (user) => {
    if (user) {
        try {
            // Cargar datos desde Firestore
            const userDocRef = doc(db, "Usuarios", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const { nombreUsuario, correo, telefono, tipoCuenta } = userDoc.data();
                document.getElementById("username").value = nombreUsuario || "";
                document.getElementById("email").value = correo || "";  // Se deja como solo lectura
                document.getElementById("phone").value = telefono || "";
                document.getElementById("tipo").value = tipoCuenta || "";
                document.getElementById("tipo").disabled = true; // Deshabilitar tipo de cuenta
            } else {
                throw new Error("No se encontraron datos del usuario.");
            }
        } catch (error) {
            console.error("Error al cargar datos:", error);
            messageDiv.textContent = "Error al cargar los datos. Inténtalo nuevamente.";
            messageDiv.style.color = "#E30000";
        }

        // Guardar datos generales
        generalForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nombreUsuario = document.getElementById("username").value.trim();
            const correo = document.getElementById("email").value.trim();  // Correo no editable
            const telefono = document.getElementById("phone").value.trim();

            if (!nombreUsuario || !telefono) {
                messageDiv.textContent = "Por favor, completa todos los campos.";
                messageDiv.style.color = "#E30000";
                return;
            }

            try {
                // No permitir modificar el correo
                if (correo !== user.email) {
                    messageDiv.textContent = "El correo electrónico no puede ser modificado.";
                    messageDiv.style.color = "#E30000";
                    return;
                }

                // Actualizar datos en Firestore
                await updateDoc(doc(db, "Usuarios", user.uid), {
                    nombreUsuario,
                    telefono,
                });

                messageDiv.textContent = "Datos actualizados exitosamente.";
                messageDiv.style.color = "#005BC2";
            } catch (error) {
                console.error("Error al actualizar datos:", error);
                messageDiv.textContent = "Error al guardar los datos. Inténtalo nuevamente.";
                messageDiv.style.color = "#E30000";
            }
        });

        

  

        // Cambiar contraseña
        passwordForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const currentPassword = document.getElementById("current-password").value.trim();
            const nuevaContraseña = document.getElementById("new-password").value.trim();
            const confirmarContraseña = document.getElementById("confirm-password").value.trim();

            if (!currentPassword || !nuevaContraseña || !confirmarContraseña) {
                messageDiv.textContent = "Por favor, completa todos los campos de contraseña.";
                messageDiv.style.color = "#E30000";
                return;
            }

            if (nuevaContraseña !== confirmarContraseña) {
                messageDiv.textContent = "Las contraseñas no coinciden.";
                messageDiv.style.color = "#E30000";
                return;
            }

            try {
                // Reautenticación para contraseña
                const credential = EmailAuthProvider.credential(user.email, currentPassword);
                await reauthenticateWithCredential(user, credential);

                await updatePassword(user, nuevaContraseña);
                messageDiv.textContent = "Contraseña actualizada correctamente.";
                messageDiv.style.color = "#005BC2";
            } catch (error) {
                console.error("Error al actualizar la contraseña:", error);
                messageDiv.textContent = "Error al actualizar la contraseña. Inténtalo nuevamente.";
                messageDiv.style.color = "#E30000";
            }
        });
    } else {
        window.location.href = "/screens/login.html";
    }
});
