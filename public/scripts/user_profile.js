document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const errorMessage = document.getElementById('error-message');
    const userIconLink = document.getElementById('user-icon-link');

    if (!loginButton) {
        console.error('El botón de inicio de sesión no se encontró en el DOM');
        return;
    }

    // Maneja el clic en el botón de inicio de sesión
    loginButton.addEventListener('click', async function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Por favor, complete todos los campos.';
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success');
                window.location.href = '/user'; // Redirigir a la página de perfil de usuario
            } else {
                errorMessage.style.display = 'block';
                errorMessage.textContent = data.error || 'Nombre de usuario o contraseña incorrectos.';
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Error en la solicitud. Inténtalo de nuevo.';
        }
    });

    // Maneja el clic en el ícono de usuario
    if (userIconLink) {
        userIconLink.addEventListener('click', function(event) {
            const token = localStorage.getItem('token');

            if (token) {
                // Usuario autenticado, redirige a user.html
                window.location.href = '/user';
            } else {
                // Usuario no autenticado, redirige a login.html
                event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
                Swal.fire('No Autenticado', 'Debes iniciar sesión para acceder a esta página.', 'info')
                    .then(() => window.location.href = '/login');
            }
        });
    }
});
