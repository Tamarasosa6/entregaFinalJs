document.addEventListener('DOMContentLoaded', function() {
   
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
        } else if (value === 'Contactos') {
            mostrarContacto(); 
        } else {
            mostrarProductos(productosGlobales);
        }
    });


    function mostrarContacto() {
        document.getElementById('mainContent').style.display = 'none';
        document.getElementById('contactoSection').style.display = 'block';
    }

    const contactoForm = document.getElementById('contactoForm');
    if (contactoForm) {
        contactoForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const nombre = document.getElementById('nombreContacto').value; // Cambiado a 'nombreContacto'
            const email = document.getElementById('emailContacto').value;
            const telefono = document.getElementById('telefono').value;
            const mensaje = document.getElementById('mensaje').value;

            Swal.fire({
                icon: 'success',
                title: 'Mensaje Enviado',
                text: 'Tu mensaje se ha enviado exitosamente. Te responderemos a la brevedad.',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById('contactoSection').style.display = 'none';
                    document.getElementById('mainContent').style.display = 'block'; // Regresar al contenido principal
                }
            });
        });
    }
});
