# Sistema de Gestión de Inventario y Control de Ventas - Materiales SADA

## Objetivo
El sistema de gestión de inventarios y control de ventas de Materiales SADA es una aplicación web que facilita a los clientes la exploración de productos, mientras optimiza las operaciones internas de la empresa. Proporciona a los administradores herramientas para gestionar inventarios, ventas y cuentas de usuario de manera eficiente. Este sistema busca mantener un control de stock en tiempo real y ofrecer información actualizada sobre productos y servicios, mejorando la experiencia de compra.

## Alcance
El sistema permite a los clientes explorar el catálogo de productos de Materiales SADA y a los administradores gestionar el inventario, las ventas y las cuentas de usuario.

### Vista del Cliente
Diseñada para los clientes, la interfaz incluye:
- **Menú Principal**: Espacio para mostrar anuncios, promociones e información general sobre la empresa.
- **Sección de Productos**: Catálogo de productos con opciones de filtrado (por categoría, precio, etc.). Los clientes pueden ver la disponibilidad, descripción y detalles de cada producto.
- **Información de la Empresa**: Misión, visión y datos de contacto de la empresa.

### Vista del Administrador
Disponible solo para cuentas de administrador, esta vista incluye herramientas avanzadas para la gestión:
- **Gestión de Productos**: Permite agregar, modificar o eliminar productos, actualizando el stock en tiempo real para que los clientes vean la disponibilidad precisa.
- **Control de Ventas Diarias**: Registro de ventas con los productos vendidos y sus cantidades para un seguimiento preciso de las transacciones.
- **Control de Stock**: Actualización automática del inventario al registrar ventas o añadir nuevo stock.
- **Gestión de Cuentas de Usuarios**: Permisos exclusivos para el administrador principal en la creación, modificación y eliminación de cuentas.

## Funciones del Sistema

### Inicio de Sesión y Recuperación de Contraseña
- **Inicio de Sesión**: Todos los usuarios deben autenticarse con nombre de usuario y contraseña.
- **Recuperación de Contraseña**: Opción de recuperación mediante un código de verificación enviado por correo o teléfono.
- **Roles de Acceso**: Solo el administrador principal tiene acceso completo a todas las funciones, incluyendo la gestión de cuentas.

### Módulo de Inventario
- **Agregar Productos**: Los administradores pueden registrar nuevos productos con detalles como nombre, categoría, precio, proveedor y cantidad inicial.
- **Modificar Productos**: Actualización de cualquier información sobre los productos existentes.
- **Consultar Productos**: Listado de productos con opciones de filtrado (categoría, precio, disponibilidad).
- **Eliminar Productos**: Opción para eliminar productos que ya no están disponibles o que la empresa ya no desea vender.

### Módulo de Gestión de Usuarios
- **Agregar Cuenta de Usuario**: Creación de nuevas cuentas de usuario con datos como nombre, contraseña, correo y teléfono.
- **Modificar Cuenta de Usuario**: Actualización de la información de cuenta de los administradores.
- **Consulta de Cuentas Activas**: El administrador principal puede visualizar todas las cuentas activas.
- **Eliminar Cuenta de Usuario**: El administrador principal puede eliminar cuentas que ya no sean necesarias.
