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
    const productosEnCarrito = JSON.parse(localStorage.getItem('cart')) || [];


    productosEnCarrito.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'producto';
        productDiv.innerHTML = `
                    <h2${product.name}</h2>
                  <p>Costo: ${product.cost}</p>
                    <p>Moneda: ${product.currency}</p>
                    <img src="${product.image}" alt="${product.name}">
                    <p>Subtotal: ${product.unitCost}</p>
                   id="${product.id}
        `;
        cartContainer.appendChild(productoDiv);
    });
}

//muestra los productos

function cartContainer() {
    const cart = document.getElementById('cart');
    productos.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "producto";
        productDiv.innerHTML = `
            ${product.name} - $${product.cost} - $${product.currency}
        `;
        productList.appendChild(productDiv);
    })
};
