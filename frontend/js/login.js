let form = document.getElementById('needs-validation');

// funcion para validar si el email guardado en el userData(localstorage) concuerda con el nuevo email ingrsado para restaurar los datos
let validateUserExistance = () => {
    let lastUserData = localStorage.getItem("userData") || "";
    if (lastUserData) {
        const { email } = JSON.parse(lastUserData);
        let currentUserEmail = document.getElementById("email").value;
        if (email !== currentUserEmail) {
            localStorage.removeItem("userData")
            localStorage.removeItem("carrito")
        }
    }
}
// funcion para verificar el formulario.
let verifyUser = () => {
    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            form.classList.add('was-validated');

        } else {
            e.preventDefault()
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            localStorage.setItem('usuario', email);
            validateUserExistance();
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
            window.location.href = 'index.html';
        }
    }, false);
}


