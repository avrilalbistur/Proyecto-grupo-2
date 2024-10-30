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






// Función para actualizar el carrito en usuario
function actualizarCarrito() {
    const cartContainer = document.getElementById('cart-container');
    const productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    cartContainer.innerHTML = ''; // Limpiar el contenedor del carrito

    productosEnCarrito.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'producto';
        productDiv.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}">
            <h2>${product.nombre}</h2>
            <p>Costo: ${product.costo}</p>
            <p>Moneda: ${product.moneda}</p>
            
        `;
        cartContainer.appendChild(productDiv);
    });
}

// Función para mostrar los productos
function mostrarProductos() {
    const cart = document.getElementById('carrito');
    const productos = JSON.parse(localStorage.getItem('carrito')) || [];

    productos.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'productos';
        productDiv.innerHTML = `
            ${product.nombre} - $${product.costo} - ${product.moneda}
        `;
        cart.appendChild(productDiv);
    });
}

// Llamar a la función actualizarCarrito cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarCarrito();
    mostrarProductos();
});
