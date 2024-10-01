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
          total += producto.precio * cantidad;
          actualizarCarrito();
          Swal.fire('Producto agregado', `${producto.nombre} ha sido añadido al carrito`, 'success');
        } else {
          Swal.fire('Error', 'Por favor, ingrese una cantidad válida.', 'error');
        }
      }
    })
    .catch(error => console.error('Error al cargar los productos:', error));
}

function actualizarCarrito() {
  const listaCarrito = document.getElementById('listaCarrito');
  const carritoIcon = document.getElementById('carrito-icon');

  if (listaCarrito) {
    listaCarrito.innerHTML = carrito.length > 0
      ? carrito.map(item => `
        <p>${item.nombre} (x${item.cantidad}) - $${item.precio * item.cantidad} 
          <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        </p>`).join('')
      : '<p>El carrito está vacío.</p>';
  }

  if (carritoIcon) {
    carritoIcon.innerText = carrito.length;
  }

  document.getElementById('carritoTotal').innerText = `Total: $${total}`;
}

function eliminarDelCarrito(id) {
  const producto = carrito.find(item => item.id === id);
  if (producto) {
    carrito = carrito.filter(item => item.id !== id);
    total -= producto.precio * producto.cantidad;
    actualizarCarrito();
  }
}


document.getElementById('btnFinalizarCompra').addEventListener('click', () => {
  document.getElementById('formCompra').style.display = 'block';
});

function finalizarCompra() {
  const metodoPago = document.querySelector('#metodoPago').value;
  const nombre = document.querySelector('#nombre').value.trim();
  const apellido = document.querySelector('#apellido').value.trim();
  const email = document.querySelector('#email').value.trim();


  if (!nombre || !apellido || !email) {
    Swal.fire('Error', 'Por favor, complete todos los campos del formulario.', 'error');
    return;
  }


  const emailValido = /\S+@\S+\.\S+/.test(email);
  if (!emailValido) {
    Swal.fire('Error', 'Por favor, ingrese un email válido.', 'error');
    return;
  }

  Swal.fire({
    title: 'Compra finalizada',
    text: `Gracias por tu compra, ${nombre} ${apellido}. Hemos enviado la confirmación a ${email}.`,
    icon: 'success',
    confirmButtonText: 'OK'
  }).then(() => {
    
    carrito = [];
    total = 0;
    actualizarCarrito();

    document.querySelector('#formCompra').style.display = 'none';


    window.location.href = "index.html";
  });
}
