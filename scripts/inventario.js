import { storage, db } from "./firebaseConfig.js";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

const form = document.getElementById("producto-form");
const tablaProductos = document.querySelector("#productos-table tbody");
const productosRef = collection(db, "productos");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const marca = document.getElementById("marca").value;
    const categoria = document.getElementById("categoria").value;
    const id = document.getElementById("producto-id").value;
    const disponibilidad = parseInt(document.getElementById("disponibilidad").value, 10);
    const fotoFile = document.getElementById("foto").files[0];

    // Validación de disponibilidad
    if (isNaN(disponibilidad) || disponibilidad < 0) {
        alert("Por favor, ingrese una disponibilidad válida (mayor o igual a 0).");
        return;
    }

    // Validación de campos vacíos
    if (!nombre || !descripcion || !precio || !marca || !categoria) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Validación del precio
    if (isNaN(precio) || precio <= 0) {
        alert("Por favor, ingrese un precio válido.");
        return;
    }

    // Crear el objeto del producto
    const producto = {
        nombre,
        descripcion,
        precio,
        marca,
        categoria,
        disponibilidad,
    };

    try {
        // Subir la imagen a Firebase Storage
        if (fotoFile) {
            const fotoRef = ref(storage, `productos/${fotoFile.name}`);
            console.log("Subiendo imagen a Firebase Storage...");
            await uploadBytes(fotoRef, fotoFile);
            const fotoUrl = await getDownloadURL(fotoRef);
            producto.foto = fotoUrl;
        }

        // Guardar el producto en Firestore
        if (id) {
            // Actualizar producto existente
            const productoRef = doc(db, "productos", id);
            await updateDoc(productoRef, producto);
            alert("Producto actualizado exitosamente.");
        } else {
            // Agregar nuevo producto
            await addDoc(productosRef, producto);
            alert("Producto agregado exitosamente.");
        }

        form.reset();
        document.getElementById("producto-id").value = "";
    } catch (error) {
        console.error("Error al guardar el producto:", error);
        alert("Hubo un error al guardar el producto. Intenta de nuevo.");
    }
});

onSnapshot(productosRef, (snapshot) => {
    tablaProductos.innerHTML = "";
    // Recorrer los productos y agregarlos a la tabla
    snapshot.forEach((doc) => {
        const producto = doc.data();
        const id = doc.id;
        const fila = document.createElement("tr");

        // Agregar los datos del producto a la fila
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>$${producto.precio}</td>
            <td>${producto.marca}</td>
            <td>${producto.categoria}</td>
            <td>
                ${producto.foto ? `<img src="${producto.foto}" alt="Foto de ${producto.nombre}" style="max-width: 100px; max-height: 100px;">` : "Sin imagen"}
            </td>
            <td>
                <button data-id="${id}" class="editar">Editar</button>
                <button data-id="${id}" class="eliminar">Eliminar</button>
            </td>
        `;

        fila.querySelector(".editar").addEventListener("click", () => cargarFormulario(id, producto));
        fila.querySelector(".eliminar").addEventListener("click", () => eliminarProducto(id));
        tablaProductos.appendChild(fila);
    });
});

// Función para cargar el producto y poder modificarlo
function cargarFormulario(id, producto) {
    document.getElementById("producto-id").value = id;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("marca").value = producto.marca;
    document.getElementById("categoria").value = producto.categoria;

    const existingPreview = document.querySelector(".user-form img");
    if (existingPreview) {
        existingPreview.remove();
    }

    if (producto.foto) {
        const newPreview = document.createElement("img");
        newPreview.src = producto.foto;
        newPreview.style.maxWidth = "100px";
        newPreview.alt = "Vista previa";
        document.querySelector(".user-form").appendChild(newPreview);
    }
}

// Función para eliminar un producto
async function eliminarProducto(id) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.");
    if (confirmacion) {
        try {
            const productoRef = doc(db, "productos", id);
            await deleteDoc(productoRef);
            alert("Producto eliminado exitosamente.");
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            alert("Hubo un error al eliminar el producto. Intenta de nuevo.");
        }
    }
}
