// Función para crear las cajas de los productos
let showProducts = (productsArray) =>{
    let htmlProductsToAppend = "";
    productsArray.forEach(product => {
        htmlProductsToAppend += `
            <div class="product">
                <img src= "${product.image}" alt="${product.name}">
                <div>
                    <h2>${product.name}</h2>
                    <p class="description">${product.description}</p>
                    <p class="price">${product.currency} ${product.cost}</p>
                 <p class="sold-quantity">Cantidad de vendidos:${product.soldCount}</p>
                </div>
            </div>
        `
    })
    document.getElementById('product-container').innerHTML = htmlProductsToAppend;
}
// Función del buscador (Desafiate entrega 3)
let searchBar = document.getElementById('search-bar');
let productContainer = document.getElementById('product-container')

//Función que se va a ejecutar cuando el contenido HTML esté cargado

document.addEventListener('DOMContentLoaded',(e)=>{
   getJSONData(PRODUCTS_URL+101+EXT_TYPE)
        .then(object =>{
            if(object.status === 'ok'){
              let productsArray = object.data.products;
              showProducts(productsArray); 
            };
        } );
});