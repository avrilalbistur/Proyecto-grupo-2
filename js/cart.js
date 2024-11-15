// Función para actualizar el carrito en usuario
function actualizarCarrito() {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;

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
// Función para remover un producto

function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevoCarrito = carrito.filter(producto => producto.id !== id);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    actualizarBadge();
    actualizarCarrito();
    mostrarCarrito();
    actualizarCostos();
}
// funcion para pasar de una moneda a la otra dependiendo del usuario
function convertirMoneda(costo, cantidad, monedaOrigen, monedaDestino) {
    const TASA_CAMBIO_USD_UYU = 0.024;
    const TASA_CAMBIO_UYU_USD = 42.48;

    if (monedaOrigen === monedaDestino) return costo * cantidad;

    return monedaOrigen === "USD"
        ? costo * cantidad * TASA_CAMBIO_UYU_USD
        : costo * cantidad * TASA_CAMBIO_USD_UYU;
}
// función para actualizar la sección de costos dependiendo de la moneda que el usuario 
function actualizarCostos(moneda = null) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) return;

    const totalPrecio = document.getElementById("total-precio");
    const totalProductosElement = document.querySelector(".resumen-container h4");

    moneda = moneda || carrito[0].moneda; // Usar la moneda del primer producto si no se especifica
    let total = 0;
    let totalProductos = 0;

    // Calcular el total y el total de productos
    carrito.forEach(producto => {
        total += convertirMoneda(producto.costo, producto.cantidad, producto.moneda, moneda);
        totalProductos += producto.cantidad;
    });

    // Mostrar el precio total y la cantidad total de productos
    totalPrecio.textContent = `TOTAL ${moneda} ${total.toFixed(2)}`;
    totalProductosElement.textContent = `PRODUCTOS TOTALES ${totalProductos}`;

    // Guardar el total en el almacenamiento local
    localStorage.setItem(`totalCarrito${moneda}`, total.toFixed(2));
    console.log(carrito);
    
    // Calcular el total con envío
    calcularTotalConEnvio(moneda);
}
// funcion para calcular el total dependiendo del envio seleccionado
function calcularTotalConEnvio(moneda) {
    const totalPrecio = document.getElementById("total-precio");
    let total = parseFloat(localStorage.getItem(`totalCarrito${moneda}`)) || 0; // Obtener el total actual
    let costoEnvio = 0;

    // para obtener el tipo de envío seleccionado
    const tipoEnvio = document.querySelector('input[name="tipo"]:checked').value;
    
    // para calcular el costo de envío basado en el tipo seleccionado
    switch (tipoEnvio) {
        case "premium":
            costoEnvio = total * 0.15; // 15% del total
            break;
        case "express":
            costoEnvio = total * 0.07; // 7% del total
            break;
        case "standard":
            costoEnvio = total * 0.05; // 5% del total
            break;
    }

    // Sumar el costo del envío al total
    total += costoEnvio;

    // Mostrar el nuevo total
    totalPrecio.textContent = `TOTAL ${moneda} ${total.toFixed(2)}`;
}

// Función para mostrar los productos en el carrito en cart.html
function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
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
    // Añadir event listeners a cada input de cantidad
    document.querySelectorAll(".cantidad-input").forEach(input => {
        input.addEventListener("change", actualizarCantidad);
    });
    actualizarCostos();
}

// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidad(event) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
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
    actualizarCostos()
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



// Llama a esta función cuando se carga la página para inicializar el badge
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('input[name="tipo"]').forEach((element) => {
        element.addEventListener("change", function() {
            calcularTotalConEnvio(); // Calcular total con el envío seleccionado
        });
    });
    actualizarCarrito();
    actualizarBadge();
    mostrarCarrito();
})
document.addEventListener("DOMContentLoaded", function() {
    // El código JavaScript que maneja el formulario
    document.getElementById("formulario-compra").addEventListener("submit", function(event) {
        event.preventDefault();  // Evitar que el formulario se envíe de forma tradicional

        // Mostrar el SweetAlert de confirmación de compra
        Swal.fire({
            title: "¿Estás seguro/a de realizar esta compra?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,  // Botón de cancelar
            confirmButtonText: "¡Sí, confirmar!", // Botón de confirmación
            cancelButtonText: "Cancelar", // Botón de cancelar
            confirmButtonColor: "#3085d6",  // Color del botón de confirmación
            cancelButtonColor: "#d33",  // Color del botón de cancelar
            allowOutsideClick: false,  // No permite cerrar fuera del cartel
            allowEscapeKey: false,  // No permite cerrarlo con la tecla Escape
            showConfirmButton: true,  // Asegura que el botón de confirmación esté siempre visible
            showCancelButton: true,  // Asegura que el botón de cancelación esté visible
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma la compra
                Swal.fire({
                    title: "¡Confirmado!",
                    text: "Tu compra ha sido realizada con éxito.",
                    icon: "success",
                    confirmButtonText: "Continuar"
                }).then(() => {
                    // Aquí puedes agregar el código para vaciar el carrito y realizar las acciones correspondientes
                    console.log("Compra realizada con éxito.");
                });
                // Vaciar el carrito
    localStorage.removeItem('carrito');  // Elimina el carrito del almacenamiento local

    // Limpiar el formulario de compra
    document.getElementById('formulario-compra').reset();  // Restablece todos los campos del formulario

    // Actualizar la vista para reflejar que el carrito está vacío
    actualizarCarrito();  
    mostrarCarrito();     
    actualizarCostos();  

    console.log("Compra realizada con éxito. El carrito ha sido vaciado y el formulario limpiado.");
  } else if (result.isDismissed) {
                // Si el usuario cancela
                console.log("Compra cancelada.");
            }
        });
    });
});