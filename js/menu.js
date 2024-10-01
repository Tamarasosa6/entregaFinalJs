document.getElementById('menuDropdown').addEventListener('change', function() {
    let categoria = this.value;
    localStorage.setItem('categoriaSeleccionada', categoria);
    mostrarProductosPorCategoria(categoria);
  });
  
  function mostrarProductosPorCategoria(categoria) {
    fetch('./json/productos.json')
        .then(response => response.json())
        .then(productos => {
            let productosFiltrados = productos.filter(producto => producto.categoria === categoria || categoria === "Todos");
            mostrarProductos(productosFiltrados);
        })
        .catch(error => console.error("Error al cargar los productos: ", error));
  }
  
  window.onload = function() {
    let categoriaGuardada = localStorage.getItem('categoriaSeleccionada') || "Todos";
    document.getElementById('menuDropdown').value = categoriaGuardada;
    mostrarProductosPorCategoria(categoriaGuardada);
  };
  