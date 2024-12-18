let productInfo;
let productID = localStorage.getItem("productID");
const today = new Date();
let commentsList = [];
let htmlProductComments = "";
const comentarios = []; // Arreglo para almacenar los comentarios del usuario
//variables para cambios de tema claro/oscuro
const body = document.querySelector("body");
const toggleButton = document.getElementById("toggle-theme-btn");

let showProductInfo = (product) => {
  // Crear la galería de imágenes dinámicamente
  let htmlProductsToAppend = `
    <div class="product-gallery">
  `;

  // Iterar sobre las imágenes del producto, comenzando desde el índice 1
  for (let i = 1; i < product.images.length; i++) {
    htmlProductsToAppend += `
      <img src="${product.images[i]}" alt="Imagen ${i + 1}" id="thumb${i}">
    `;
  }

  htmlProductsToAppend += `
    </div>
    <div class="product-details">
      <img id="main-image" src="${product.images[0]}" alt="Producto" class="product-main-image">
      <div>
        <p class="product-sold" id="sold-count">Cantidad de vendidos: ${product.soldCount}</p>
        <h2 class="product-title" id="product-title">${product.name}</h2>
        <p class="product-description" id="product-description">${product.description}</p>
        <p class="product-price" id="product-price">$${product.cost}</p>
        <button class="btn bg-dark text-light" onclick="agregarAlCarrito()">Agregar al carrito</button>
      </div>
    </div>
  `;

  document.getElementById("product-container").innerHTML = htmlProductsToAppend;
};

//Productos Relacionados//

let showRelatedProducts = (relatedProducts) => {
  let htmlRelatedProducts =
    '<h3 class="products-title">Productos Relacionados</h3><div class="related-products">';

  relatedProducts.forEach((product) => {
    htmlRelatedProducts += `
      <div class="related-product" onclick="loadProduct(${product.id})">
        <img src="${product.image}" alt="${product.name}">
        <p>${product.name}</p>
      </div>
    `;
  });

  htmlRelatedProducts += "</div>";
  document.getElementById("related-products-container").innerHTML =
    htmlRelatedProducts;
};

let loadProduct = (productId) => {
  localStorage.setItem("productID", productId);
  location.reload();
};

// Función para mostrar los comentarios del usuario
function showUserComment() {
  const comentariosSection = document.getElementById(
    "comments-products-container"
  );
  // comentariosSection.innerHTML = ''; // Limpiar los comentarios anteriores

  comentarios.forEach((comentario) => {
    const comentarioDiv = document.createElement("div");
    comentarioDiv.classList.add("comentario");
    // Construir estrellas llenas y vacías
    let estrellasLlenas =
      '<i class="fa-star estrella fas seleccionada" data-valor="1"></i>'.repeat(
        comentario.calificacion
      );
    let estrellasVacias =
      '<i class="far fa-star estrella" data-valor="1"></i>'.repeat(
        5 - comentario.calificacion
      );
    // Creamos el contenido del comentario con todos los datos solicitados
    comentarioDiv.innerHTML = `
      <div class="products-comments review-card p-2 shadow-lg rounded ">
        <div class="card-body">
          <div class="user-info mb-2">
            <p>${comentario.usuario}</p>
            <span class="text-muted d-block">${comentario.fecha}</span>
          </div>
          <p class="comment">${comentario.comentario}</p>
          <p class="rating">${estrellasLlenas}${estrellasVacias}</p>
          
        </div>
          
      </div>
    `;

    comentariosSection.appendChild(comentarioDiv);
  });
}
// Función para mostrar los comentarios de los productos
let showProductComments = (productsComments) => {
  htmlProductComments =
    '<h3 class="products-title">Otros comentarios:</h3><div class="products-comments">';

  productsComments.forEach((comment) => {
    htmlProductComments += `
      <div class="products-comments review-card p-2 shadow-lg rounded " onclick="loadProduct(${
        comment.product
      })">
        <div class="card-body">
          <div class="user-info mb-2">
            <p>${comment.user}</p>
            <span class="text-muted d-block">${comment.dateTime}</span>
          </div>
          <p class="comment">${comment.description}</p>
          <p class="rating">${'<i class="fa-star estrella fas "></i>'.repeat(
            comment.score
          )}</p>
          
        </div>
          
      </div>
    `;
  });

  htmlProductComments += "</div>";
  document.getElementById("comments-products-container").innerHTML =
    htmlProductComments;
};
// Función para buscar la info de los productos
let fetchProductsInfo = () => {
  if (productID) {
    getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE)
      .then((object) => {
        if (object.status === "ok") {
          productInfo = object.data;
          showProductInfo(productInfo);
          showRelatedProducts(productInfo.relatedProducts);
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  } else {
    console.error("No product ID found in localStorage");
  }
};

// Función para traer los comentarios de los productos
let fetchProductsInfoComments = () => {
  getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE).then(
    (object) => {
      commentsList = object.data;
      showProductComments(commentsList);
    }
  );
  //  Establecer el nombre del usuario
  let username = localStorage.getItem("usuario");
  if (username) {
    document.getElementById("comment-username").textContent = username;
  }
};

//  Funcion para formatear fecha
let setCurrentDate = () => {
  const day = today.getDate();
  const month = today.getMonth() + 1; // Los meses empiezan desde 0
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};
// EVENTO DEL DOCUMENTO//////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", (e) => {
  // Traer la info de los productos
  fetchProductsInfo();
  // Traer los comentarios de los productos
  fetchProductsInfoComments();

  //funcion del badge
  actualizarBadge(); 
  // Mostrar la fecha en el elemento con id "current-date"
  document.getElementById("current-date").textContent = setCurrentDate();

  // Seleccionamos todas las estrellas
  const estrellas = document.querySelectorAll(".estrella");

  // Añadimos un evento de clic a cada estrella
  estrellas.forEach((estrella) => {
    estrella.addEventListener("click", function () {
      const valor = this.getAttribute("data-valor");

      // Recorrer todas las estrellas y marcar/desmarcar según el valor
      estrellas.forEach((e) => {
        if (e.getAttribute("data-valor") <= valor) {
          e.classList.remove("far"); // quitar clase antigua
          e.classList.add("fas"); // Agregar clase para colorear
          e.classList.add("seleccionada");
        } else {
          e.classList.remove("fas"); // Quitar clase
          e.classList.add("far"); // Agregar clase antigua
          e.classList.remove("seleccionada");
        }
      });
    });
  });

  // Manejo del envío del formulario de comentarios
  document
    .getElementById("boton-enviar")
    .addEventListener("click", function () {
      const comentarioTexto =
        document.getElementById("campo-comentarios").value;
      const estrellasSeleccionadas = document.querySelectorAll(".seleccionada");

      const usuario = localStorage.getItem("usuario"); // Obtener el nombre del usuario

      if (comentarioTexto && estrellasSeleccionadas.length > 0 && usuario) {
        const nuevoComentario = {
          usuario: usuario, // Añadir el nombre de usuario
          comentario: comentarioTexto,
          fecha: setCurrentDate(), // Añadir la fecha al comentario
        };

        nuevoComentario.calificacion = estrellasSeleccionadas.length; // Asignar la calificación directamente al objeto comentario

        comentarios.push(nuevoComentario); // Añadimos el comentario al arreglo
        showUserComment(); // Actualizamos la visualización de comentarios
        // Actualizar la variable estrellas
        const estrellas = document.querySelectorAll(".estrella");

        // Limpiar la selección de estrellas
        estrellas.forEach((e) => e.classList.remove("seleccionada"));

        // Limpiar los campos de entrada
        document.getElementById("campo-comentarios").value = "";
      } else {
        alert("Por favor, completa todos los campos.");
      }
    });
  //  Codigo de modo claro/oscuro
  const theme = localStorage.getItem("theme"); // Leer el tema guardado

  if (theme === "oscuro") {
    body.classList.add("modo-oscuro");
  } else {
    body.classList.add("modo-claro");
  }

  // Este bloque se ejecuta cuando el usuario hace clic en el botón
  toggleButton.addEventListener("click", () => {
    if (body.classList.contains("modo-claro")) {
      body.classList.remove("modo-claro");
      body.classList.add("modo-oscuro");
      localStorage.setItem("theme", "oscuro"); // Guardar modo oscuro
    } else {
      body.classList.remove("modo-oscuro");
      body.classList.add("modo-claro");
      localStorage.setItem("theme", "claro"); // Guardar modo claro
    }
  });
});


// Función que se ejecuta al dar clic en el botón "Agregar al carrito"
function agregarAlCarrito() {

  // Recuperar el carrito del localStorage, o inicializarlo como un arreglo vacío
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Crear un objeto de producto con la información actual
  let productoAgregado = {
    id: productInfo.id,
    nombre: productInfo.name,
    costo: productInfo.cost,
    moneda: productInfo.currency,
    cantidad: 1,
    imagen: productInfo.images[0],
    subtotal: productInfo.cost // El subtotal inicial (costo * cantidad)
  };

  // Verificar si el producto ya existe en el carrito
  const productoExistente = carrito.find(item => item.nombre === productoAgregado.nombre);

  if (productoExistente) {
    // Si el producto ya está en el carrito, aumentar la cantidad y el subtotal
    productoExistente.cantidad += 1;
    productoExistente.subtotal = productoExistente.costo * productoExistente.cantidad;
  } else {
    // Si el producto no está en el carrito, añadirlo como nuevo
    carrito.push(productoAgregado);
  }

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Redireccionar a cart.html
  window.location.href = "cart.html";
}
