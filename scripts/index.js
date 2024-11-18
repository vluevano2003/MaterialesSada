//Desplazamiento del carrusel
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

//Destacados
document.addEventListener('DOMContentLoaded', () => {
  const productosDestacados = [
    { nombre: 'Saco de Cemento', categoria: 'Construcción', marca: 'Marca A', precio: 999, imagen: '/images/saco-cemento.jpg', disponibilidad: 'Disponible' },
    { nombre: 'Block de Concreto', categoria: 'Construcción', marca: 'Marca B', precio: 1200, imagen: '/images/block-concreto.jpg', disponibilidad: 'Disponible' },
    { nombre: 'Tornillo', categoria: 'Herramientas', marca: 'Marca C', precio: 150, imagen: '/images/tornillo.jpg', disponibilidad: 'Agotado' },
  ];

  // Función para mostrar los productos destacados
  const mostrarProductosDestacados = () => {
    destacados.innerHTML = '';
    productosDestacados.forEach((producto, index) => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');
      productoDiv.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <span class="precio">$${producto.precio}.00</span>
      `;
      productoDiv.addEventListener('click', () => mostrarDetallesProducto(producto));
      destacados.appendChild(productoDiv);
    });
  };

  // Función para mostrar los detalles del producto en el pop-up
  const mostrarDetallesProducto = (producto) => {
    popUpImagen.src = producto.imagen;
    popUpNombre.textContent = producto.nombre;
    popUpPrecio.textContent = `Precio: $${producto.precio}.00`;
    popUpCategoria.textContent = `Categoría: ${producto.categoria}`;
    popUpMarca.textContent = `Marca: ${producto.marca}`;
    popUpDisponibilidad.textContent = `Disponibilidad: ${producto.disponibilidad}`;
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

  // Mostrar los productos destacados al cargar la página
  mostrarProductosDestacados();
});
