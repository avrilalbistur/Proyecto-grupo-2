document.addEventListener("DOMContentLoaded", function () {
    //funcion del badge
    actualizarBadge();

    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });


    document.addEventListener("DOMContentLoaded", () => {
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
                            'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
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
})