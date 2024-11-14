
// Función para agregar un producto al carrito
// function agregarProducto(id, nombre, costo, moneda, imagen) {
//     const producto = { id, nombre, costo, moneda, imagen };
//     carrito.push(producto);
//     localStorage.setItem('carrito', JSON.stringify(carrito));
//     actualizarBadge();
//     calcularTotal();
// }

// Función para calcular el total de productos en el carrito
function calcularTotal() {
    let total = 0;
    carrito.forEach(product => {
        total += product.costo; // Asumiendo que 'costo' es un número
    });
    const totalContainer = document.querySelector('#carrito h3');
    if (totalContainer) {
        totalContainer.textContent = `Total: $${total}`;
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

function actualizarCostos(moneda){
    const TASA_CAMBIO_USD_UYU = 0.024;
    const TASA_CAMBIO_UYU_USD = 42.48;
    const totalPrecio = document.getElementById("total-precio");
    const totalProductosElement = document.querySelector(".resumen-container h4");
    let total = 0;
    let totalProductos = 0;

    // sumar el total de productos
    carrito.forEach(product => totalProductos += product.cantidad);

    // calcular el total en base a la moneda seleccionada
    if(moneda === "USD"){
        carrito.forEach(product =>{
            let totalEnUSD = product.moneda ==="UYU" ? (product.costo * TASA_CAMBIO_USD_UYU) : product.costo;
            total += totalEnUSD * product.cantidad;
        })
    }else if(moneda === "UYU"){
        carrito.forEach(product =>{
            let totalEnUYU = product.moneda === "USD" ? (product.costo * TASA_CAMBIO_UYU_USD) : product.costo;
            total += totalEnUYU * product.cantidad;
        });
    };
    // mostrar el precio total
    totalPrecio.textContent = `TOTAL ${moneda} ${total.toFixed(2)}`;
    // mostrar el total de productos
    totalProductosElement.textContent = `PRODUCTOS TOTALES ${totalProductos}`;
};

// Función para mostrar los productos en el carrito en cart.html
function mostrarCarrito() {
  const listaProductos = document.getElementById("lista-productos");


  listaProductos.innerHTML = ""; // Limpiar la lista de productos

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
          <button onclick="eliminarProducto(${producto.id})" id="${producto.id}">Eliminar</button>
        </div>
      `;


      // Añadir el producto al contenedor de la lista de productos
      listaProductos.appendChild(productoDiv);
  });
  actualizarCostos("USD");

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



//Nav para comprar
let navComprar = document.querySelectorAll(".nav-item .comprar")
navComprar.forEach(link => {
    link.addEventListener("click", () => {
        navComprar.forEach(item => {
            item.classList.remove("active")
        })
        link.classList.add("active")

    })
    
});
   


// Función para remover un producto

function eliminarProducto(id) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    console.log(carrito);
    console.log(id);
    const nuevoCarrito = carrito.filter(producto => producto.id !== id);
    console.log('Nuevo Carrito:', nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    actualizarBadge();
    calcularTotal();
    actualizarCarrito();
    mostrarCarrito();
    actualizarCostos("USD");
}
console.log(carrito);


// Llama a esta función cuando se carga la página para inicializar el badge
document.addEventListener("DOMContentLoaded", function () {
    actualizarCarrito();
    actualizarBadge();
    mostrarCarrito();
})
