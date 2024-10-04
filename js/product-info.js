let productInfo;
let productID = localStorage.getItem('productID');
const today = new Date();
const Comments_Data="https://japceibal.github.io/emercado-api/products_comments/50741.json";
let commentsList=[];
let htmlProductComments = "";

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
  getJSONData(Comments_Data)
    .then(object=>{
      commentsList=object.data;
      showProductComments(commentsList);
    })
});


// sección de comentarios

document.addEventListener('DOMContentLoaded', function() {
  var username = localStorage.getItem('usuario');
  if (username) {
      document.getElementById('comment-username').textContent = username;
  } })


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

// Formatear la fecha (día, mes, año)
const day = today.getDate();
const month = today.getMonth() + 1; // Los meses empiezan desde 0
const year = today.getFullYear();

// Mostrar la fecha en el elemento con id "current-date"
document.getElementById("current-date").textContent = `${day}/${month}/${year}`;
