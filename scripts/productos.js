//Lista de productos
document.addEventListener('DOMContentLoaded', () => {
  const productos = [
    { nombre: 'Saco de Cemento', categoria: 'Construcción', marca: 'Marca A', precio: 999, imagen: '/images/saco-cemento.jpg', disponibilidad: 'Disponible' },
    { nombre: 'Block de Concreto', categoria: 'Construcción', marca: 'Marca B', precio: 1200, imagen: '/images/block-concreto.jpg', disponibilidad: 'Disponible' },
    { nombre: 'Tornillo', categoria: 'Herramientas', marca: 'Marca C', precio: 150, imagen: '/images/tornillo.jpg', disponibilidad: 'Agotado' },
  ];

  const filtroNombre = document.getElementById('filtro-nombre');
  const filtroCategoria = document.getElementById('filtro-categoria');
  const filtroMarca = document.getElementById('filtro-marca');
  const filtroPrecio = document.getElementById('filtro-precio');
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

  // Función para mostrar los productos
  const mostrarProductos = (productos) => {
    productosContainer.innerHTML = '';
    productos.forEach((producto, index) => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');
      productoDiv.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <span class="precio">$${producto.precio}.00</span>
        `;
      productoDiv.addEventListener('click', () => mostrarDetallesProducto(index));
      productosContainer.appendChild(productoDiv);
    });
  };

  // Función para mostrar los detalles del producto en el pop-up
  const mostrarDetallesProducto = (index) => {
    const producto = productos[index];
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

  // Mostrar todos los productos al cargar la página
  mostrarProductos(productos);
});
