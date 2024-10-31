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
          <h4>${producto.nombre}</h4>
          <p>MONEDA ${producto.moneda}</p>
          <p>PRECIO ${producto.costo.toFixed(2)}</p>
          <label for="cantidad-${index}">CANTIDAD</label>
          <input type="number" id="cantidad-${index}" min="1" value="${producto.cantidad}" data-index="${index}" class="cantidad-input">
          <p>SUBTOTAL ${(producto.costo * producto.cantidad).toFixed(2)}</p>
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


// Inicializar la vista del carrito cuando se carga la página
document.addEventListener("DOMContentLoaded", mostrarCarrito);