// Function to create product boxes

let showProducts = (productsArray) =>{
    let htmlProductsToAppend = "";
    productsArray.forEach(product => {
        htmlProductsToAppend += `
            <h1>${product.name}</h1>
            <p>Price: $${product.cost}</p>
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