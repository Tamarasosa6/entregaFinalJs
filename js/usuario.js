document.getElementById('crearCuenta').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "" || password === "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (!/^\d+$/.test(password)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La contraseña debe contener solo números.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    
    const usuario = { username, password };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    Swal.fire({
        icon: 'success',
        title: 'Cuenta creada',
        text: `Bienvenido/a, ${username}!`,
        confirmButtonText: 'Aceptar'
    }).then(() => {
        document.getElementById('bienvenida').style.display = 'block';
        document.getElementById('user').innerText = username;
        document.getElementById('crear-cuenta').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    });
});
