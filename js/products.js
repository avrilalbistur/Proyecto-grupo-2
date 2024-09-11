let minPrice = undefined;
let maxPrice = undefined;
let productsArray = []


// Function to create product boxes
let showProducts = (productsArray) =>{
    let htmlProductsToAppend = "";
    
    productsArray.forEach(product => {
        
    if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
    ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice)))
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

document.addEventListener('DOMContentLoaded', (e) => {
    let catID = localStorage.getItem("catID");
    if (catID) {
        getJSONData(PRODUCTS_URL + catID + EXT_TYPE)
            .then(object => {
                if (object.status === 'ok') {
                    productsArray = object.data.products;
                    showProducts(productsArray);
                    // Actualizar el título y el encabezado <h1>
                    document.title = object.data.catName;
                    document.getElementById('category-title').textContent = object.data.catName;
                }
            });
    }
});



document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    showProducts(productsArray);
});

document.getElementById("rangeFilterPrice").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minPrice = document.getElementById("rangeFilterPriceMin").value;
    maxPrice = document.getElementById("rangeFilterPriceMax").value;

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
        minPrice = parseInt(minPrice);
    }
    else{
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
        maxPrice = parseInt(maxPrice);
    }
    else{
        maxPrice = undefined;
    }

    showProducts(productsArray);
});


