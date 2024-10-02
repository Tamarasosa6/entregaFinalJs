let carrito = []; 
let total = 0;

document.getElementById('btnCarrito').addEventListener('click', () => {
  const myModal = new bootstrap.Modal(document.getElementById('modalCarrito'));
  myModal.show();
});

function cargarProductos() {
  fetch('./json/productos.json')
    .then(response => response.json())
    .then(productos => {
      const contenedorProductos = document.getElementById('productosContenedor');
      if (contenedorProductos) {
        contenedorProductos.innerHTML = productos.map(producto => `
          <div class="producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <input type="number" id="cantidad-${producto.id}" placeholder="Cantidad" min="1" max="${producto.cantidad}">
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
          </div>
        `).join('');
      }
    })
    .catch(error => console.error('Error al cargar los productos:', error));
}

function agregarAlCarrito(id) {
  fetch('./json/productos.json')
    .then(response => response.json())
    .then(productos => {
      const producto = productos.find(p => p.id === id);
      if (producto) {
        const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
        if (!isNaN(cantidad) && cantidad > 0 && cantidad <= producto.cantidad) {
          const productoEnCarrito = carrito.find(item => item.id === id);
          if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
          } else {
            carrito.push({ ...producto, cantidad });
          }
          actualizarCarrito();
          mostrarNotificacion(`Agregado al carrito: ${producto.nombre} (Cantidad: ${cantidad})`);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Cantidad no válida',
            text: 'Por favor, introduce una cantidad válida.',
            confirmButtonText: 'Aceptar'
          });
        }
      }
    });
}

function mostrarNotificacion(mensaje) {
  Swal.fire({
    icon: 'success',
    title: 'Producto agregado',
    text: mensaje,
    confirmButtonText: 'Aceptar',
    timer: 2000, 
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
    willClose: () => {
      Swal.stopTimer();
    }
  });
}

function actualizarCarrito() {
  const listaCarrito = document.getElementById('listaCarrito');
  if (listaCarrito) {
    listaCarrito.innerHTML = carrito.map(item => `
      <div>
        ${item.nombre} - $${item.precio} x ${item.cantidad}
        <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
      </div>
    `).join('');
    total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    document.getElementById('carritoTotal').innerText = `Total: $${total}`;
  }

  document.getElementById('carrito-icon').innerText = carrito.length;
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  actualizarCarrito();
}

document.getElementById('btnFinalizarCompra').addEventListener('click', () => {
  if (carrito.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Carrito vacío',
      text: 'No hay productos en el carrito para finalizar la compra.',
      confirmButtonText: 'Aceptar'
    });
  } else {
    document.getElementById('formCompra').style.display = 'block';
  }
});

function finalizarCompra() {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;

  if (nombre && apellido && email) {
    Swal.fire({
      icon: 'success',
      title: 'Compra exitosa',
      text: 'Gracias por tu compra!',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      carrito = [];
      total = 0;
      actualizarCarrito();
      document.getElementById('formCompra').style.display = 'none';

      
      setTimeout(() => {
        window.location.href = 'index.html'; 
      }, 3000); 
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa todos los campos.',
      confirmButtonText: 'Aceptar'
    });
  }
}

cargarProductos();
