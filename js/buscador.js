document.getElementById('btnBuscar').addEventListener('click', () => {
    const query = document.getElementById('buscador').value.toLowerCase();
    
    const productosFiltrados = productosGlobales.filter(producto => 
        producto.nombre.toLowerCase().includes(query) ||
        producto.categoria.toLowerCase().includes(query)
    );

    if (productosFiltrados.length > 0) {
        mostrarProductos(productosFiltrados);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'No se encontraron productos',
            text: 'Por favor, introduce un nombre de producto válido o revisa las categorías.',
            confirmButtonText: 'Aceptar'
        });
    }
});
