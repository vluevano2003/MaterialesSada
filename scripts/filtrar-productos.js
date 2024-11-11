document.addEventListener('DOMContentLoaded', () => {
  const productos = [
    { nombre: 'Saco de Cemento', categoria: 'Construcción', marca: 'Marca A', precio: 999, imagen: '/images/saco-cemento.jpg', disponibilidad: 'Disponible' },
    { nombre: 'Block de Concreto', categoria: 'Construcción', marca: 'Marca B', precio: 1200, imagen: '/images/block-concreto.jpg', disponibilidad: 'Disponible' },
    { nombre: 'Tornillo', categoria: 'Herramientas', marca: 'Marca C', precio: 150, imagen: '/images/tornillo.jpg', disponibilidad: 'Agotado' },
    // Generamos más productos dinámicamente para llegar a 50.
    ...Array.from({ length: 47 }, (_, i) => ({
      nombre: `Producto ${i + 4}`,
      categoria: i % 2 === 0 ? 'Construcción' : 'Accesorios',
      marca: i % 3 === 0 ? 'Marca A' : i % 3 === 1 ? 'Marca B' : 'Marca C',
      precio: 500 + i * 10,
      imagen: `/images/producto${i + 4}.jpg`,
      disponibilidad: i % 5 === 0 ? 'Agotado' : 'Disponible'
    }))
  ];

  const filtroNombre = document.getElementById('filtro-nombre');
  const filtroCategoria = document.getElementById('filtro-categoria');
  const filtroMarca = document.getElementById('filtro-marca');
  const filtroPrecio = document.getElementById('filtro-precio');
  const botonFiltrar = document.getElementById('boton-filtrar');
  const botonQuitarFiltros = document.getElementById('boton-quitar-filtros');
  const productosContainer = document.getElementById('productos-container');

  const modal = document.getElementById('producto-modal');
  const cerrarModal = document.getElementById('cerrar-modal');
  const modalImagen = document.getElementById('modal-imagen');
  const modalNombre = document.getElementById('modal-nombre');
  const modalPrecio = document.getElementById('modal-precio');
  const modalCategoria = document.getElementById('modal-categoria');
  const modalMarca = document.getElementById('modal-marca');
  const modalDisponibilidad = document.getElementById('modal-disponibilidad');

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

  // Función para mostrar los detalles del producto en el modal
  const mostrarDetallesProducto = (index) => {
    const producto = productos[index];
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
  cerrarModal.addEventListener('click', cerrarModalFuncion);

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      cerrarModalFuncion();
    }
  });

  // Mostrar todos los productos al cargar la página
  mostrarProductos(productos);
});
