document.getElementById('menuDropdown').addEventListener('change', (event) => {
  const value = event.target.value;
  if (value === 'Todos') {
      mostrarProductos(productosGlobales);
  } else if (value === 'Remeras') {
      mostrarProductos(productosGlobales.filter(producto => producto.categoria === 'Remeras'));
  } else if (value === 'Buzos') {
      mostrarProductos(productosGlobales.filter(producto => producto.categoria === 'Buzos'));
  } else if (value === 'Camisetas') {
      mostrarProductos(productosGlobales.filter(producto => producto.categoria === 'Camisetas'));
  } else {
      mostrarProductos(productosGlobales);
  }
});
