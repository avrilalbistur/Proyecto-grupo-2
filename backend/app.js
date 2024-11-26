document.addEventListener("DOMContentLoaded", function () {
    // Verificar si estamos en la página de login
    if (window.location.pathname.includes('login.html')) {
        const loginForm = document.getElementById('needs-validation');
        if (loginForm) {
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
                        console.log("Respuesta del servidor:", data); // Verifica la respuesta completa
                        if (data.token) {
                            localStorage.setItem('authToken', data.token); // Guardar el token en localStorage
                            console.log("Token guardado:", data.token);
                            window.location.href = "index.html"; // Redirigir a la página principal
                        } else {
                            console.error("No se recibió el token");
                        }
                    })
                    .catch(error => console.error('Error al hacer login:', error));
            });
        } else {
            console.warn("Formulario de login no encontrado.");
        }
    }

    // Verificar si estamos en la página index.html
    if (window.location.pathname.includes('index.html')) {
        const protectedDataButton = document.getElementById('getProtectedData');
        if (protectedDataButton) {
            console.log("Botón encontrado. Añadiendo evento...");
            protectedDataButton.addEventListener('click', function () {
                const token = localStorage.getItem('authToken');
                console.log("Token obtenido de localStorage:", token);

                if (!token) {
                    console.log("No estás autenticado.");
                    alert("Debes iniciar sesión para acceder a los datos protegidos.");
                    return;
                }

                fetch('/protected', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('No autorizado o token inválido');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("Datos protegidos:", data);
                        alert("Datos protegidos recibidos. Revisa la consola.");
                    })
                    .catch(error => {
                        console.error('Error al obtener los datos protegidos:', error);
                        alert("Error al acceder a los datos protegidos.");
                    });
            });
        } else {
            console.warn("Botón de datos protegidos no encontrado.");
        }
    }
});
