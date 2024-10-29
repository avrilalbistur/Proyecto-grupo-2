// Inicializa el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para agregar un producto al carrito
function agregarProducto(id, nombre) {
    const producto = { id, nombre };
    cart.push(producto);
    localStorage.setItem('cart', JSON.stringify(cart));
    actualizarBadge();
}

// Función para actualizar el badge del carrito
function actualizarBadge() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount){
    cartCount.textContent = cart.length; // Actualiza la cantidad de productos en el badge
}
}

// Llama a esta función cuando se carga la página para inicializar el badge
document.addEventListener("DOMContentLoaded", function () {
    // Inicializa el badge
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