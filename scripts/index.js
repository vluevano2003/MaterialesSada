import { db } from "./firebaseConfig.js";
import { collection, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const indicators = document.querySelectorAll('.indicator');
const destacados = document.getElementById('destacados-container');
const popUp = document.getElementById('producto');
const cerrarPopUp = document.getElementById('cerrar');
const popUpImagen = document.getElementById('imagen');
const popUpNombre = document.getElementById('nombre');
const popUpPrecio = document.getElementById('precio');
const popUpCategoria = document.getElementById('categoria');
const popUpMarca = document.getElementById('marca');
const popUpDisponibilidad = document.getElementById('disponibilidad');
const popUpDescripcion = document.getElementById('descripcion');

//Función para cambiar entre anuncios
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
  updateIndicators(index);
}

//Función para actualizar los indicadores
function updateIndicators(index) {
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });
}

//Funciones para cambiar entre anuncios
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

showSlide(currentSlide);

//Función para mostrar los detalles del producto en el pop-up
document.addEventListener('DOMContentLoaded', () => {
  let productosDestacados = [];

  // Obtener productos destacados desde Firebase
  const productosRef = collection(db, "productos");
  const destacadosQuery = query(productosRef, orderBy("disponibilidad", "desc"), limit(3));

  onSnapshot(destacadosQuery, (snapshot) => {
    productosDestacados = [];
    snapshot.forEach((doc) => {
      const producto = doc.data();
      productosDestacados.push({
        nombre: producto.nombre,
        categoria: producto.categoria,
        marca: producto.marca,
        precio: producto.precio,
        imagen: producto.foto || '/images/default.jpeg',
        disponibilidad: producto.disponibilidad,
        descripcion: producto.descripcion,
      });
    });
    mostrarProductosDestacados();
  });

  // Función para mostrar los productos destacados
  const mostrarProductosDestacados = () => {
    destacados.innerHTML = '';
    productosDestacados.forEach((producto) => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');
      productoDiv.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <span class="precio">$${producto.precio}</span>
      `;
      productoDiv.addEventListener('click', () => mostrarDetallesProducto(producto));
      destacados.appendChild(productoDiv);
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
  cerrarPopUp.addEventListener('click', cerrarModalFuncion);
  window.addEventListener('click', (event) => {
    if (event.target === popUp) {
      cerrarModalFuncion();
    }
  });
});
