// Function to create product boxes
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

//function that will be executed when the document completely is fully loaded 

document.addEventListener('DOMContentLoaded',(e)=>{
   getJSONData(PRODUCTS_URL+101+EXT_TYPE)
        .then(object =>{
            if(object.status === 'ok'){
              let productsArray = object.data.products;
            showProducts(productsArray);  
            };
        } );
});