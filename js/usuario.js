document.getElementById('crearCuenta').addEventListener('click', () => {
    crearCuenta();
});

const mostrarMensaje = (mensaje, tipo) => {
    const mensajesDiv = document.getElementById('contenedor-mensajes');
    mensajesDiv.innerHTML = '';

    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = tipo === 'error' ? 'mensaje-error' : 'mensaje-success';
    mensajeDiv.textContent = mensaje;
    mensajesDiv.appendChild(mensajeDiv);

    setTimeout(() => {
        if (mensajesDiv.contains(mensajeDiv)) {
            mensajesDiv.removeChild(mensajeDiv);
        }
    }, 3000);
};

const esNumerica = str => /^\d+$/.test(str);

const crearCuenta = () => {
    const usuarioInput = document.getElementById('username').value.trim();
    const contraseña = document.getElementById('password').value;

    if (!usuarioInput) {
        mostrarMensaje('Por favor, ingresa un nombre de usuario.', 'error');
        return;
    }

    if (!esNumerica(contraseña)) {
        mostrarMensaje('La contraseña debe ser numérica. Inténtalo de nuevo.', 'error');
        return;
    }

    localStorage.setItem('usuario', usuarioInput);
    localStorage.setItem('contraseña', contraseña);

    document.getElementById('crear-cuenta').style.display = 'none';
    document.getElementById('bienvenida').style.display = 'block';
    document.getElementById('user').textContent = usuarioInput;

    
    document.getElementById('navBar').style.display = 'block';
    document.getElementById('mainContent').style.display = 'block';

    mostrarMensaje(`Cuenta creada exitosamente. Bienvenido/a, ${usuarioInput} a nuestra Tienda!`, 'success');
};
