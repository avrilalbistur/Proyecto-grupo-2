document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('needs-validation');

    let validateUserExistance = () => {
        let lastUserData = localStorage.getItem("userData") || "";
        if (lastUserData) {
            const { email } = JSON.parse(lastUserData);
            let currentUserEmail = document.getElementById("username").value;
            if (email !== currentUserEmail) {
                console.log("El email no coincide, limpiando datos del localStorage.");
                localStorage.removeItem("userData");
                localStorage.removeItem("carrito");
            }
        }
    };

    let verifyUser = () => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Siempre detener el comportamiento predeterminado del formulario.
            if (!form.checkValidity()) {
                e.stopPropagation();
                form.classList.add('was-validated');
                console.log("Formulario inválido.");
            } else {
                console.log("Formulario válido, procesando login...");
                let email = document.getElementById('username').value;
                let password = document.getElementById('password').value;

                localStorage.setItem('usuario', email);
                validateUserExistance();

                fetch('http://localhost:3001/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                })
                    .then((response) => {
                        console.log("Respuesta recibida del servidor:", response);
                        if (!response.ok) {
                            throw new Error(`Error HTTP: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log("Datos recibidos del servidor:", data);
                        if (data.token) {
                            localStorage.setItem('authToken', data.token);
                            console.log("Token guardado, redirigiendo...");
                            window.location.href = "index.html";
                        } else {
                            console.error("El servidor no envió un token.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error en la solicitud fetch:", error);
                    });
            }
        });
    };

    verifyUser();
})