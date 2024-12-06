import { auth, db } from "./firebaseConfig.js";
import {createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import {collection, getDocs, doc, getDoc, setDoc, updateDoc} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const addUserForm = document.getElementById("add-user-form");
const userTableBody = document.getElementById("user-table-body");

// Función para crear un nuevo usuario
addUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombreUsuario = e.target.username.value;
    const correo = e.target.email.value;
    const password = e.target.password.value;
    const telefono = e.target.phone.value;
    const tipoCuenta = e.target["account-type"].value;

    try {
        const currentUser = auth.currentUser;
        const currentEmail = currentUser ? currentUser.email : null;
        const currentPassword = currentUser ? e.target.password.value : null;

        const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
        const newUser = userCredential.user;

        await setDoc(doc(db, "Usuarios", newUser.uid), {
            nombreUsuario,
            correo,
            telefono,
            tipoCuenta,
            uid: newUser.uid,
            activo: true, 
        });

        //Se inicia sesión con la nueva cuenta, luego se cierra sesión y se vuelve a iniciar con la cuenta anterior
        console.log("Usuario creado exitosamente.");
        showMessage("Usuario creado exitosamente.", "success");
        addUserForm.reset();

        await signOut(auth);

        if (currentEmail && currentPassword) {
            await signInWithEmailAndPassword(auth, currentEmail, currentPassword);
            console.log("Vuelto a iniciar sesión con la cuenta anterior.");
        }

        loadUsers();

    } catch (error) {
        console.error("Error al crear usuario:", error);
        showMessage("No se pudo crear el usuario. Intenta nuevamente.", "error");
    }
});

// Función para mostrar los usuarios en la tabla
async function loadUsers() {
    userTableBody.innerHTML = "";
    const usersCollection = collection(db, "Usuarios");

    try {
        const snapshot = await getDocs(usersCollection);
        snapshot.forEach((userDoc) => {
            const userData = userDoc.data();
            const row = document.createElement("tr");
            const buttonClass = userData.activo ? "active" : "inactive";
            const buttonText = userData.activo ? "Desactivar" : "Reactivar";

            // Fila de la tabla
            row.innerHTML = `
                <td>${userData.nombreUsuario}</td>
                <td>${userData.correo}</td>
                <td>${userData.telefono}</td>
                <td>${userData.tipoCuenta}</td>
                <td>${userData.activo ? "Activo" : "Desactivado"}</td>
                <td>
                    <button class="toggle-button ${buttonClass}" data-id="${userDoc.id}">${buttonText}</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });

        // Cambiar el estado de los usuarios
        const toggleButtons = document.querySelectorAll(".toggle-button");
        toggleButtons.forEach((button) =>
            button.addEventListener("click", async (e) => {
                const userId = e.target.dataset.id;
                try {
                    await toggleUserAccount(userId); // Cambiar el estado de la cuenta
                } catch (error) {
                    console.error("Error al cambiar estado de usuario:", error);
                }
            })
        );
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
        showMessage("Error al cargar usuarios. Intenta nuevamente.", "error");
    }
}

// Mostrar mensajes en pantalla
function showMessage(message, type = "success") {
    const messageContainer = document.getElementById("message-container");
    messageContainer.textContent = message;
    messageContainer.className = `message-${type}`;

    setTimeout(() => {
        messageContainer.textContent = "";
        messageContainer.className = "";
    }, 3000);
}

// Función para cambiar el estado de la cuenta
async function toggleUserAccount(userId) {
    try {
        const userRef = doc(db, "Usuarios", userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            console.error("Usuario no encontrado en Firestore.");
            return;
        }

        const userData = userDoc.data();
        const currentUser = auth.currentUser;

        if (userData.correo === currentUser?.email) {
            showMessage("No puedes cambiar el estado de tu propia cuenta.", "error");
            return;
        }

        // Cambiar el estado de la cuenta
        const newState = !userData.activo; // Si está activo, lo desactiva, y viceversa
        await updateDoc(userRef, { activo: newState });

        const actionMessage = newState ? "reactivada" : "desactivada";
        console.log(`Cuenta ${actionMessage} exitosamente.`);
        showMessage(`Cuenta ${actionMessage} exitosamente.`, "success");
        loadUsers();
    } catch (error) {
        console.error("Error al cambiar el estado del usuario:", error);
        showMessage("No se pudo cambiar el estado del usuario. Intenta nuevamente.", "error");
    }
}

document.addEventListener("DOMContentLoaded", loadUsers);