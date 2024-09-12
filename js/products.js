const ORDER_ASC_BY_PRICE = "0";
const ORDER_DESC_BY_PRICE = "9";
const ORDER_BY_PROD_COUNT = "Cant.";
let minPrice = undefined;
let maxPrice = undefined;
let productsArray = []
let currentSortCriteria = undefined;
let currentProductsArray = [];

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_PRICE){
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if ( aPrice > bPrice ){ return -1; }
            if ( aPrice < bPrice ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if ( aPrice < bPrice ){ return -1; }
            if ( aPrice > bPrice ){ return 1; }
            return 0;
        });
    }

    return result;
}

// Function to create product boxes
let showProducts = (productsArray) => {
    let htmlProductsToAppend = "";
    
    productsArray.forEach((product, index) => {
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {

            htmlProductsToAppend += `
                <div class="product" id="product-${index}" style="cursor: pointer;">
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h2>${product.name}</h2>
                        <p class="description">${product.description}</p>
                        <p class="price">${product.currency} ${product.cost}</p>
                        <p class="sold-quantity">Cantidad de vendidos: ${product.soldCount}</p>
                    </div>
                </div>
            `;
        }
    });
    
    document.getElementById('product-container').innerHTML = htmlProductsToAppend;

    // Añadir eventos click a los contenedores de productos para redirigir
    productsArray.forEach((product, index) => {
        document.getElementById(`product-${index}`).addEventListener('click', function() {
            // Redirigir a la página de información del producto
            window.location.href = "product-info.html"; // Cambia esta URL si es necesario
        });
    });
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProducts(currentProductsArray);
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

document.getElementById("sortPriceAsc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_ASC_BY_PRICE,productsArray);
});

document.getElementById("sortPriceDesc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_DESC_BY_PRICE,productsArray);
});

document.getElementById("sortByCount").addEventListener("click", function(){
    sortAndShowProducts(ORDER_BY_PROD_COUNT, productsArray);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    showProducts(productsArray);
});

document.getElementById("rangeFilterPrice").addEventListener("click", function(){
    // Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad de productos por categoría
    minPrice = document.getElementById("rangeFilterPriceMin").value;
    maxPrice = document.getElementById("rangeFilterPriceMax").value;

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
        minPrice = parseInt(minPrice);
    } else {
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
        maxPrice = parseInt(maxPrice);
    } else {
        maxPrice = undefined;
    }

    showProducts(productsArray);
});
