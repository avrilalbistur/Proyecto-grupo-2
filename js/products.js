const ORDER_ASC_BY_PRICE = "0";
const ORDER_DESC_BY_PRICE = "9";
const ORDER_BY_PROD_COUNT = "Cant.";
let minPrice = undefined;
let maxPrice = undefined;
let productsArray = [];
let currentSortCriteria = undefined;
let currentProductsArray = []; // Cambiado para mantener el estado actual

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            return bCount - aCount; // Simplificado
        });
    } else if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function(a, b) {
            return parseInt(a.cost) - parseInt(b.cost); // Simplificado
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function(a, b) {
            return parseInt(b.cost) - parseInt(a.cost); // Simplificado
        });
    }
    return result;
}

// Función para crear cajas de productos
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
            localStorage.setItem('productID', product.id); 
            window.location.href = "product-info.html";
        });
    });
}

function sortAndShowProducts(sortCriteria) {
    currentSortCriteria = sortCriteria;

    // Ordenar currentProductsArray (que contiene los productos actuales)
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    // Mostrar los productos ordenados
    showProducts(currentProductsArray);
}

// Función que se ejecutará cuando el documento esté completamente cargado 
document.addEventListener('DOMContentLoaded', (e) => {
    let catID = localStorage.getItem("catID");
    if (catID) {
        getJSONData(PRODUCTS_URL + catID + EXT_TYPE)
            .then(object => {
                if (object.status === 'ok') {
                    productsArray = object.data.products; 
                    currentProductsArray = productsArray; 
                    showProducts(productsArray); 
                    document.title = object.data.catName;
                    document.getElementById('category-title').textContent = object.data.catName;
                }
            });
    }

    // BUSCADOR
    document.getElementById('search-bar').addEventListener('input', (e) => {
        let searchValue = e.target.value.trim().toLowerCase();
        currentProductsArray = productsArray.filter(product => 
            product.name.toLowerCase().includes(searchValue) || 
            product.description.toLowerCase().includes(searchValue)
        );
        showProducts(currentProductsArray); // Muestra solo los productos filtrados
    });
});

// Eventos de ordenación
document.getElementById("sortPriceAsc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
});

document.getElementById("sortPriceDesc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
});

document.getElementById("sortByCount").addEventListener("click", function(){
    sortAndShowProducts(ORDER_BY_PROD_COUNT);
});

// Filtros de precio
document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    // Mostrar todos los productos
    currentProductsArray = productsArray; // Reiniciar a la lista original
    showProducts(currentProductsArray);
});

document.getElementById("rangeFilterPrice").addEventListener("click", function(){
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

    currentProductsArray = productsArray; // Reiniciar a la lista original
    showProducts(currentProductsArray);
});
