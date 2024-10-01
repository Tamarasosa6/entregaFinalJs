let productosGlobales = []; 

function mostrarProductos(productos) {
    let contenedor = document.getElementById("productosContenedor");
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        let productoHTML = `
            <div class="producto col-md-4 mb-3">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Cantidad disponible: ${producto.cantidad}</p>
                <label for="talle-${producto.id}">Talle:</label>
                <select id="talle-${producto.id}" class="form-select">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
                <input type="number" id="cantidad-${producto.id}" class="form-control" placeholder="Cantidad" min="1" max="${producto.cantidad}">
                <button onclick="agregarAlCarrito(${producto.id})" class="btn btn-primary mt-2">Agregar al carrito</button>
            </div>
        `;
        contenedor.innerHTML += productoHTML;
    });
}

fetch('./json/productos.json')
    .then(response => response.json())
    .then(productos => {
        productosGlobales = productos; 
        mostrarProductos(productos);
    })
    .catch(error => console.error("Error al cargar los productos: ", error));

document.getElementById('btnBuscar').addEventListener('click', () => {
    const query = document.getElementById('buscador').value.toLowerCase();
    const productosFiltrados = productosGlobales.filter(producto => 
        producto.nombre.toLowerCase().includes(query)
    );

    if (productosFiltrados.length > 0) {
        mostrarProductos(productosFiltrados);
    } else {
     
        Swal.fire({
            icon: 'warning',
            title: 'No se encontraron productos',
            text: `Por favor, introduce un nombre de producto válido. Las categorías disponibles son: Remeras, Buzos y Camisetas.`,
            confirmButtonText: 'Aceptar'
        });
    }
});

