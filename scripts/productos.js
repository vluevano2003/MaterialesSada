import { db } from "./firebaseConfig.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
  const filtroNombre = document.getElementById('filtro-nombre');
  const filtroCategoria = document.getElementById('filtro-categoria');
  const filtroMarca = document.getElementById('filtro-marca');
  const filtroPrecio = document.getElementById('filtro-precio');
  const filtroPrecioMin = document.getElementById('filtro-preciomin');
  const botonFiltrar = document.getElementById('boton-filtrar');
  const botonQuitarFiltros = document.getElementById('quitar-filtros');
  const productosContainer = document.getElementById('productos-container');
  const popUp = document.getElementById('producto');
  const cerrarPopUp = document.getElementById('cerrar');
  const popUpImagen = document.getElementById('imagen');
  const popUpNombre = document.getElementById('nombre');
  const popUpPrecio = document.getElementById('precio');
  const popUpCategoria = document.getElementById('categoria');
  const popUpMarca = document.getElementById('marca');
  const popUpDisponibilidad = document.getElementById('disponibilidad');
  const popUpDescripcion = document.getElementById('descripcion');

  filtroPrecio.addEventListener('input', () => {
    if (parseFloat(filtroPrecio.value) < 0) {
      filtroPrecio.value = ''; 
    }
  });

  filtroNombre.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      filtrarProductos();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.getElementById("producto").style.display = "none";
    }
  });
  

  const productosRef = collection(db, "productos");
  const productos = [];
  const categorias = new Set();
  const marcas = new Set();

  // Obtener los productos de Firestore
  onSnapshot(productosRef, (snapshot) => {
    productos.length = 0;
    snapshot.forEach((doc) => {
      const producto = doc.data();
      productos.push({
        id: doc.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
        marca: producto.marca,
        precio: producto.precio,
        imagen: producto.foto || '/images/default.jpeg',
        disponibilidad: producto.disponibilidad,
      });

      // Agregar la categoría y la marca a los filtros
      categorias.add(producto.categoria);
      marcas.add(producto.marca);
    });

    actualizarFiltros();
    mostrarProductos(productos);
  });

  // Función para actualizar los filtros
  const actualizarFiltros = () => {
    filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>';
    filtroMarca.innerHTML = '<option value="">Todas las marcas</option>';

    // Añadir las categorías dinámicamente
    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria;
      option.textContent = categoria;
      filtroCategoria.appendChild(option);
    });

    // Añadir las marcas dinámicamente
    marcas.forEach(marca => {
      const option = document.createElement('option');
      option.value = marca;
      option.textContent = marca;
      filtroMarca.appendChild(option);
    });
  };

  // Función para mostrar los productos
  const mostrarProductos = (productos) => {
    productosContainer.innerHTML = '';
    productos.forEach((producto) => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');
      productoDiv.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <span class="precio">$${producto.precio}</span>
    `;
      productoDiv.addEventListener('click', () => mostrarDetallesProducto(producto));
      productosContainer.appendChild(productoDiv);
    });
  };

  // Función para mostrar los detalles del producto en el pop-up
  const mostrarDetallesProducto = (producto) => {
    popUpImagen.src = producto.imagen;
    popUpNombre.textContent = producto.nombre;
    popUpPrecio.textContent = `Precio: $${producto.precio}`;
    popUpCategoria.textContent = `Categoría: ${producto.categoria}`;
    popUpMarca.textContent = `Marca: ${producto.marca}`;
    popUpDisponibilidad.textContent = `Disponibilidad: ${producto.disponibilidad}`;
    popUpDescripcion.textContent = `Descripción: ${producto.descripcion}`;
    popUp.style.display = 'block';
  };

  // Función para cerrar el pop-up
  const cerrarModalFuncion = () => {
    popUp.style.display = 'none';
  };

  // Filtrar productos
  const filtrarProductos = () => {
    const nombre = filtroNombre.value.toLowerCase();
    const categoria = filtroCategoria.value;
    const marca = filtroMarca.value;
    const precioMax = parseFloat(filtroPrecio.value) || Infinity;

    const productosFiltrados = productos.filter(producto => {
      const coincideNombre = producto.nombre.toLowerCase().includes(nombre);
      const coincideCategoria = categoria === '' || producto.categoria === categoria;
      const coincideMarca = marca === '' || producto.marca === marca;
      const coincidePrecio = producto.precio <= precioMax;
      return coincideNombre && coincideCategoria && coincideMarca && coincidePrecio;
    });

    mostrarProductos(productosFiltrados);
  };

  // Quitar filtros
  const quitarFiltros = () => {
    filtroNombre.value = '';
    filtroCategoria.value = '';
    filtroMarca.value = '';
    filtroPrecio.value = '';
    mostrarProductos(productos);
  };

  botonFiltrar.addEventListener('click', filtrarProductos);
  botonQuitarFiltros.addEventListener('click', quitarFiltros);
  cerrarPopUp.addEventListener('click', cerrarModalFuncion);

  window.addEventListener('click', (event) => {
    if (event.target === popUp) {
      cerrarModalFuncion();
    }
  });
});
