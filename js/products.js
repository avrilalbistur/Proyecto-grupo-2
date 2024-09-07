let minPrice = undefined;
let maxPrice = undefined;



// Function to create product boxes
let showProducts = (productsArray) =>{
    let htmlProductsToAppend = "";
    
    productsArray.forEach(product => {
        
    if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
    ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount)))
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



document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showCategoriesList();
});

document.getElementById("rangeFilterPrice").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterPriceMin").value;
    maxCount = document.getElementById("rangeFilterPriceMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    showCategoriesList();
});


function FilterPrice(productsArray) {

}