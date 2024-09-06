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
// variable en la que se guardan los productos que vienen del JSON
let productsArray;
//Función que se va a ejecutar cuando el contenido HTML esté cargado

document.addEventListener('DOMContentLoaded',(e)=>{
   getJSONData(PRODUCTS_URL+101+EXT_TYPE)
        .then(object =>{
            if(object.status === 'ok'){
              productsArray = object.data.products;
              showProducts(productsArray); 
              
            };
    });
 // BUSCADOR (DESAFIATE ENTREGA 3) BUSCA TANTO EN EL NOMBRE COMO EN LA DESCRIPCION
    document.getElementById('search-bar').addEventListener('input', (e) => {
        let searchValue = e.target.value.trim().toLowerCase();
        let filteredProducts = productsArray.filter(product => product.name.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue));
        showProducts(filteredProducts);
    });
});