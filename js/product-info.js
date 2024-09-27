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

//Productos Relacionados//

let showRelatedProducts = (relatedProducts) => {
  let htmlRelatedProducts = '<h3>Productos Relacionados</h3><div class="related-products">';
 
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
