let productInfo;
let productID = localStorage.getItem('productID');

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

document.addEventListener('DOMContentLoaded', (e) => {
      getJSONData(PRODUCT_INFO_URL +productID+ EXT_TYPE)
          .then(object => {
              if (object.status === 'ok') {
                  productInfo = object.data;
                  showProductInfo(productInfo);
              }
          });
          
});