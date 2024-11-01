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

// Llama a esta función cuando se carga la página para inicializar el badge
document.addEventListener("DOMContentLoaded", function () {
    actualizarBadge(); 
    actualizarCarrito();
    mostrarCarrito();
})

// Función para mostrar los productos en el carrito en cart.html
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const listaProductos = document.getElementById("lista-productos");
  const totalPrecio = document.getElementById("total-precio");
  const totalProductosElement = document.querySelector(".resumen-container h4");


  listaProductos.innerHTML = ""; // Limpiar la lista de productos
  let total = 0;
  let totalProductos = 0;


  // Obtener la moneda del primer producto (asumiendo que todos tienen la misma moneda)
  const moneda = carrito.length > 0 ? carrito[0].moneda : "UYU"; // Cambia "UYU" a "USD" si es necesario


  carrito.forEach((producto, index) => {
      // Crear el contenedor para cada producto
      const productoDiv = document.createElement("div");
      productoDiv.classList.add("producto-item");


      // Crear el contenido del producto
      productoDiv.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
        <div class="detalles-producto">
          <h4 class="dark-mode-title">${producto.nombre}</h4>
          <p class="dark-mode-title">MONEDA ${producto.moneda}</p>
          <p class="dark-mode-title">PRECIO ${producto.costo.toFixed(2)}</p>
          <label for="cantidad-${index}" class="dark-mode-title">CANTIDAD</label>
          <input type="number" id="cantidad-${index}" min="1" value="${producto.cantidad}" data-index="${index}" class="cantidad-input">
          <p class="dark-mode-title">SUBTOTAL ${(producto.costo * producto.cantidad).toFixed(2)}</p>
        </div>
      `;


      // Añadir el producto al contenedor de la lista de productos
      listaProductos.appendChild(productoDiv);


      // Actualizar el total de la compra
      total += producto.costo * producto.cantidad;
      totalProductos += producto.cantidad; // Sumar la cantidad de cada producto
  });


  // Mostrar el precio total con la moneda
  totalPrecio.textContent = `TOTAL ${moneda} ${total.toFixed(2)}`;
 
  // Mostrar el total de productos
  totalProductosElement.textContent = `PRODUCTOS TOTALES ${totalProductos}`;


  // Añadir event listeners a cada input de cantidad
  document.querySelectorAll(".cantidad-input").forEach(input => {
      input.addEventListener("change", actualizarCantidad);
  });
}


// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidad(event) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const index = event.target.dataset.index;
  const nuevaCantidad = parseInt(event.target.value);


  if (nuevaCantidad > 0) {
      carrito[index].cantidad = nuevaCantidad;
      carrito[index].subtotal = carrito[index].costo * nuevaCantidad;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito(); // Recargar la vista del carrito
  } else {
      alert("La cantidad debe ser al menos 1");
  }
}
