// Inicializa el carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar un producto al carrito
function agregarProducto(id, nombre) {
    const producto = { id, nombre };
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarBadge();
}

// Función para actualizar el badge del carrito
function actualizarBadge() {
    const carritoCount = document.getElementById('carritoCount'); 
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []; 
    if (carritoCount) {
        carritoCount.textContent = carrito.length; // Actualiza la cantidad en el badge
    } else {
        console.error("Element 'carritoCount' no encontrado en el DOM.");
    }
}

// Llama a esta función cuando se carga la página para inicializar el badge
document.addEventListener("DOMContentLoaded", function () {
    actualizarBadge(); 

    // Event listeners para agregar productos al carrito
    const autos = document.getElementById('autos');
    const juguetes = document.getElementById('juguetes');
    const muebles = document.getElementById('muebles');

    if (autos) {
        autos.addEventListener('click', function () {
            agregarProducto('autos', 'Autos');
        });
    }

    if (juguetes) {
        juguetes.addEventListener('click', function () {
            agregarProducto('juguetes', 'Juguetes');
        });
    }

    if (muebles) {
        muebles.addEventListener('click', function () {
            agregarProducto('muebles', 'Muebles');
        });
    }
});