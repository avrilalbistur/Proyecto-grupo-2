document.addEventListener("DOMContentLoaded", function () {
    // Agrega el evento de submit para el formulario de login
    const loginForm = document.getElementById('login-form');
    if (login-form) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Enviar la solicitud POST al backend para hacer login
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        localStorage.setItem('authToken', data.token); // Guardar el token en localStorage
                        console.log("Token guardado:", data.token);
                    } else {
                        console.error("No se recibió el token");
                    }
                })
                .catch(error => console.error('Error al hacer login:', error));
        });
    } else {
        console.warn("Formulario de login no encontrado.");
    }

    // Validar botón de datos protegidos
    const protectedDataButton = document.getElementById('getProtectedData');
    if (protectedDataButton) {
        protectedDataButton.addEventListener('click', function () {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.log("No estás autenticado.");
                return;
            }

            fetch('/protected', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert("Datos protegidos recibidos. Revisa la consola.");
                })
                .catch(error => console.error('Error:', error));
        });
    } else {
        console.warn("Botón de datos protegidos no encontrado.");
    }
});