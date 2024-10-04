let productInfo;
let productID = localStorage.getItem('productID');
const today = new Date();
const comentarios = []; // Arreglo para almacenar los comentarios

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
      </div>
    </div>
  `;

  document.getElementById('product-container').innerHTML = htmlProductsToAppend;
}

//Productos Relacionados//

let showRelatedProducts = (relatedProducts) => {
  let htmlRelatedProducts = '<h3 class="title">Productos Relacionados</h3><div class="related-products">';
 
  relatedProducts.forEach(product => {
    htmlRelatedProducts += `
      <div class="related-product" onclick="loadProduct(${product.id})">
        <img src="${product.image}" alt="${product.name}">
        <p>${product.name}</p>
      </div>
    `;
  });
 
  htmlRelatedProducts += '</div>';
  document.getElementById('related-products-container').innerHTML = htmlRelatedProducts;
};


let loadProduct = (productId) => {
  localStorage.setItem('productID', productId);
  location.reload();
};


document.addEventListener('DOMContentLoaded', (e) => {
  if (productID) {
    getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE)
      .then(object => {
        if (object.status === 'ok') {
          productInfo = object.data;
          showProductInfo(productInfo);
          showRelatedProducts(productInfo.relatedProducts);
        }
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  } else {
    console.error('No product ID found in localStorage');
  }
});


// sección de comentarios

document.addEventListener('DOMContentLoaded', function() {
  var username = localStorage.getItem('usuario');
  if (username) {
      document.getElementById('comment-username').textContent = username;
  };


  // Formatear la fecha (día, mes, año)
  const day = today.getDate();
  const month = today.getMonth() + 1; // Los meses empiezan desde 0
  const year = today.getFullYear();

  // Mostrar la fecha en el elemento con id "current-date"
  document.getElementById("current-date").textContent = `${day}/${month}/${year}`;

  // Seleccionamos todas las estrellas
  const estrellas = document.querySelectorAll('.estrella');
  console.log(estrellas);
  
  // Añadimos un evento de clic a cada estrella
  estrellas.forEach(estrella => {
    estrella.addEventListener('click', function() {
      const valor = this.getAttribute('data-valor');
      console.log(valor);
      
      // Recorrer todas las estrellas y marcar/desmarcar según el valor
      estrellas.forEach(e => {
        if (e.getAttribute('data-valor') <= valor) {
          e.classList.remove('far'); // quitar clase antigua
          e.classList.add('fas')// Agregar clase para colorear
        } else {
          e.classList.remove('fas'); // Quitar clase
          e.classList.add('far'); // Agregar clase antigua
        }
      });
    });
  });

  // Manejo del envío del formulario de comentarios
  document.getElementById('boton-enviar').addEventListener('click', function() {
    const tituloComentario = document.getElementById('titulo-comentarios').value;
    const comentarioTexto = document.getElementById('campo-comentarios').value;
    const estrellasSeleccionadas = document.querySelectorAll('.estrella.seleccionada');
    const usuario = localStorage.getItem('usuario'); // Obtener el nombre del usuario

    if (tituloComentario && comentarioTexto && estrellasSeleccionadas.length > 0 && usuario) {
      const calificacion = estrellasSeleccionadas.length; // Obtener calificación de las estrellas seleccionadas
      
      // Obtener la fecha actual para el comentario
      const fechaComentario = `${day}/${month}/${year}`;
      
      const nuevoComentario = {
        usuario: usuario, // Añadir el nombre de usuario
        titulo: tituloComentario,
        comentario: comentarioTexto,
        calificacion: calificacion, // Añadir calificación al comentario
        fecha: fechaComentario, // Añadir la fecha al comentario
      };
      
      comentarios.push(nuevoComentario); // Añadimos el comentario al arreglo
      mostrarComentarios(); // Actualizamos la visualización de comentarios

      // Limpiamos los campos de entrada
      document.getElementById('Título-comentarios').value = '';
      document.getElementById('campo-comentarios').value = '';
      estrellas.forEach(e => e.classList.remove('seleccionada')); // Reiniciar la selección de estrellas
    } else {
      alert("Por favor, completa todos los campos.");
    }
  });
});