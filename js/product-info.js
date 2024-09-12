let productInfo;
let productID = localStorage.getItem('productID');

let showProductInfo = (product) =>{
  let htmlProductsToAppend = `
    <div class="product-gallery">
        <img src="${product.images[1]}" alt="Imagen 1" id="thumb1">
        <img src="${product.images[2]}" alt="Imagen 2" id="thumb2">
        <img src="${product.images[3]}" alt="Imagen 3" id="thumb3">
      </div>

      <div class="product-details">
        <img id="main-image" src="${product.images[0]}" alt="Producto" class="product-main-image">
        <div>
          <p class="product-sold" id="sold-count">${product.soldCount}</p>
          <h2 class="product-title" id="product-title">${product.name}</h2>
          <p class="product-description" id="product-description">${product.description}</p>
          <p class="product-price" id="product-price">${product.cost}</p>
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