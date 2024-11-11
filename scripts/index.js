let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
  updateIndicators(index);
}

function updateIndicators(index) {
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });
}

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

//destacados
document.addEventListener('DOMContentLoaded', () => {
  const productosDestacados = [
    { nombre: 'Saco de Cemento', categoria: 'Construcción', marca: 'Marca A', precio: 999, imagen: '/images/saco-cemento.jpg', disponibilidad: 'Disponible' },
    { nombre: 'Block de Concreto', categoria: 'Construcción', marca: 'Marca B', precio: 1200, imagen: '/images/block-concreto.jpg', disponibilidad: 'Disponible' },
    { nombre: 'Tornillo', categoria: 'Herramientas', marca: 'Marca C', precio: 150, imagen: '/images/tornillo.jpg', disponibilidad: 'Agotado' },
    // Puedes añadir más productos aquí si lo deseas
  ];

  const productosDestacadosContainer = document.getElementById('productos-destacados-container');
  const modal = document.getElementById('producto-modal');
  const cerrarModal = document.getElementById('cerrar-modal');
  const modalImagen = document.getElementById('modal-imagen');
  const modalNombre = document.getElementById('modal-nombre');
  const modalPrecio = document.getElementById('modal-precio');
  const modalCategoria = document.getElementById('modal-categoria');
  const modalMarca = document.getElementById('modal-marca');
  const modalDisponibilidad = document.getElementById('modal-disponibilidad');

  // Función para mostrar los productos destacados
  const mostrarProductosDestacados = () => {
    productosDestacadosContainer.innerHTML = '';
    productosDestacados.forEach((producto, index) => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');
      productoDiv.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <span class="precio">$${producto.precio}.00</span>
      `;
      productoDiv.addEventListener('click', () => mostrarDetallesProducto(producto));
      productosDestacadosContainer.appendChild(productoDiv);
    });
  };

  // Función para mostrar los detalles del producto en el modal
  const mostrarDetallesProducto = (producto) => {
    modalImagen.src = producto.imagen;
    modalNombre.textContent = producto.nombre;
    modalPrecio.textContent = `Precio: $${producto.precio}.00`;
    modalCategoria.textContent = `Categoría: ${producto.categoria}`;
    modalMarca.textContent = `Marca: ${producto.marca}`;
    modalDisponibilidad.textContent = `Disponibilidad: ${producto.disponibilidad}`;
    modal.style.display = 'block';
  };

  // Función para cerrar el modal
  const cerrarModalFuncion = () => {
    modal.style.display = 'none';
  };

  cerrarModal.addEventListener('click', cerrarModalFuncion);
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      cerrarModalFuncion();
    }
  });

  // Mostrar los productos destacados al cargar la página
  mostrarProductosDestacados();
});
