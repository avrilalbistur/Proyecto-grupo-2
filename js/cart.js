// Inicializa el carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar un producto al carrito
function agregarProducto(id, nombre, costo, moneda, imagen) {
    const producto = { id, nombre, costo, moneda, imagen };
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarBadge();
    calcularTotal();
}

// Función para calcular el total de productos en el carrito
function calcularTotal() {
    const productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;
    productosEnCarrito.forEach(product => {
        total += product.costo; // Asumiendo que 'costo' es un número
    });
    const totalContainer = document.querySelector('#carrito h3');
    if (totalContainer) {
        totalContainer.textContent = `Total: $${total}`;
    }
}

// Función para actualizar el badge del carrito
function actualizarBadge() {
    const carritoCount = document.getElementById('carritoCount');  
    if (carritoCount) {
        carritoCount.textContent = carrito.length; // Actualiza la cantidad en el badge
    } else {
        console.error("Element 'carritoCount' no encontrado en el DOM.");
    }
}


// Función para actualizar el carrito en usuario
function actualizarCarrito() {
    const cartContainer = document.getElementById('cart-container');
    if(!cartContainer) return;

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
    const cart = document.getElementById('productos');
    if (!cart) {
        return;
    }

    const products = JSON.parse(localStorage.getItem('carrito')) || [];
    cart.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'productos';
        productDiv.innerHTML = `
            ${product.nombre} - $${product.costo} - ${product.moneda}
        `;
        cart.appendChild(productDiv);
    });

};

// Llama a esta función cuando se carga la página para inicializar el badge
document.addEventListener("DOMContentLoaded", function () {
    actualizarBadge(); 
    mostrarProductos(); 
})
