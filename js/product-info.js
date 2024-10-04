let productInfo;
let productID = localStorage.getItem('productID');
const today = new Date();
const Comments_Data="https://japceibal.github.io/emercado-api/products_comments/50741.json";
let commentsList=[];
let htmlProductComments = "";
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

// Función para mostrar los comentarios del usuario
function mostrarComentarios() {
  const comentariosSection = document.getElementById('comentario-usuario');
  comentariosSection.innerHTML = ''; // Limpiar los comentarios anteriores

  comentarios.forEach(comentario => {
    const comentarioDiv = document.createElement('div');
    comentarioDiv.classList.add('comentario');
  // Construir estrellas llenas y vacías
    let estrellasLlenas = '<i class="fa-star estrella fas seleccionada" data-valor="1"></i>'.repeat(comentario.calificacion);
    let estrellasVacias = '<i class="far fa-star estrella" data-valor="1"></i>'.repeat(5 - comentario.calificacion);
    // Creamos el contenido del comentario con todos los datos solicitados
    comentarioDiv.innerHTML = `
      <div class="comentario-header">
        <strong>${comentario.usuario}</strong> - ${comentario.fecha} - 
        <div class="star-rating">
          ${estrellasLlenas}${estrellasVacias}
        </div>
      </div>
      <h5>${comentario.titulo}</h5>
      <p>${comentario.comentario}</p>
    `;
    
    comentariosSection.appendChild(comentarioDiv);
    });
}
// Función para mostrar los comentarios de los productos
let showProductComments = (productsComments) => {
  htmlProductComments = '<h3 class="title">Otros comentarios:</h3><div class="products-comments">';
 
  productsComments.forEach(comment => {
    htmlProductComments += `
      <div class="products-comments" onclick="loadProduct(${comment.product})">
        <p>${comment.user}</p>
        <p>${comment.dateTime}</p>
        <p>${'<i class="fa-star estrella fas seleccionada" data-valor="1"></i>'.repeat(comment.score)}</p>
        <p>${comment.description}</p>
      </div>
    `;
  });
 
  htmlProductComments += '</div>';
  document.getElementById('comments-products-container').innerHTML = htmlProductComments;
};

// EVENTO DEL DOCUMENTO//////////////////////////////////////////////////////////////////////////////////////////
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
  // Traer los comentarios de los productos
  getJSONData(Comments_Data)
    .then(object=>{
      commentsList=object.data;
      showProductComments(commentsList);
    });
  //  Establecer el nombre del usuario
  let username = localStorage.getItem('usuario');
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
  
  // Añadimos un evento de clic a cada estrella
  estrellas.forEach(estrella => {
    estrella.addEventListener('click', function() {
      const valor = this.getAttribute('data-valor');
      
      // Recorrer todas las estrellas y marcar/desmarcar según el valor
      estrellas.forEach(e => {
        if (e.getAttribute('data-valor') <= valor) {
          e.classList.remove('far'); // quitar clase antigua
          e.classList.add('fas')// Agregar clase para colorear
          e.classList.add('seleccionada')
        } else {
          e.classList.remove('fas'); // Quitar clase
          e.classList.add('far'); // Agregar clase antigua
          e.classList.remove('seleccionada')
        }
      });
    });
  });

  // Manejo del envío del formulario de comentarios
  document.getElementById('boton-enviar').addEventListener('click', function() {
    const tituloComentario = document.getElementById('Titulo-comentarios').value;
    const comentarioTexto = document.getElementById('campo-comentarios').value;
    const estrellasSeleccionadas = document.querySelectorAll('.seleccionada');
    
    const usuario = localStorage.getItem('usuario'); // Obtener el nombre del usuario
  
    if (tituloComentario && comentarioTexto && estrellasSeleccionadas.length > 0 && usuario) {
      const nuevoComentario = {
        usuario: usuario, // Añadir el nombre de usuario
        titulo: tituloComentario,
        comentario: comentarioTexto,
        fecha: `${day}/${month}/${year}`, // Añadir la fecha al comentario
      };
      
      nuevoComentario.calificacion = estrellasSeleccionadas.length; // Asignar la calificación directamente al objeto comentario
      
      comentarios.push(nuevoComentario); // Añadimos el comentario al arreglo
      mostrarComentarios(); // Actualizamos la visualización de comentarios
      // Actualizar la variable estrellas
      const estrellas = document.querySelectorAll('.estrella');
    
    // Limpiar la selección de estrellas
    estrellas.forEach(e => e.classList.remove('seleccionada'));
    
    // Limpiar los campos de entrada
    document.getElementById('Titulo-comentarios').value = '';
    document.getElementById('campo-comentarios').value = '';
  } else {
    alert("Por favor, completa todos los campos.");
  }
  });
});