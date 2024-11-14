
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
// función para actualizar la sección de costos
// function actualizarCostos(){
//     const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
//     const totalPrecio = document.getElementById("total-precio");
//     const totalProductosElement = document.querySelector(".resumen-container h4");
//     let total = 0;
//     let totalProductos = 0; 

//     // Obtener la moneda del primer producto (asumiendo que todos tienen la misma moneda)
//     const moneda = carrito.length > 0 ? carrito[0].moneda : "UYU"; // Cambia "UYU" a "USD" si es necesario

//     // para sumar el total y la cantidad de productos
//     carrito.forEach(producto => {
//         total += producto.costo * producto.cantidad;
//         totalProductos += producto.cantidad;
//     });
//     // Mostrar el precio total con la moneda
//     totalPrecio.textContent = `TOTAL ${moneda} ${total.toFixed(2)}`;
 
//     // Mostrar el total de productos
//     totalProductosElement.textContent = `PRODUCTOS TOTALES ${totalProductos}`;
// }
function actualizarCostos(moneda){
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let productosEnUYU = carrito.filter(producto => producto.moneda === "UYU");
    let productosEnUSD = carrito.filter(producto => producto.moneda === "USD");
    const totalPrecio = document.getElementById("total-precio");
    const totalProductosElement = document.querySelector(".resumen-container h4");
    let total = 0;
    let totalProductos = 0;
    
    totalPrecio.innerHTML = "";
    // para sumar la cantidad de productos
    carrito.forEach(producto => {
        totalProductos += producto.cantidad;
    });
    if(moneda === "USD"){
        productosEnUYU.forEach(product => total += (product.costo / 42.16) * product.cantidad); // para convertir los pesos uruguayos en dólares
        productosEnUSD.forEach(product =>total += product.costo * product.cantidad); //para sumar a lo que ya teniamos convertido los otros elementos en dolares
    }else{
        productosEnUSD.forEach(product => total += (product.costo * 42.48) * product.cantidad); // para convertir los dólares en pesos uruguayos
        productosEnUYU.forEach(product => total += product.costo * product.cantidad); //para sumar a lo que ya teniamos convertido.
    }
      // Mostrar el precio total con la moneda
      totalPrecio.textContent = `TOTAL ${moneda} ${total.toFixed(2)}`;
      // Mostrar el total de productos
    totalProductosElement.textContent = `PRODUCTOS TOTALES ${totalProductos}`;
}
// Función para mostrar los productos en el carrito en cart.html
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
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


// Llama a esta función cuando se carga la página para inicializar el badge
document.addEventListener("DOMContentLoaded", function () {
    actualizarCarrito();
    actualizarBadge();
    mostrarCarrito();
})
