let minPrice = undefined;
let maxPrice = undefined;
let productsArray = [];

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
            // Redirigir a la página de información del producto y guardar la info de ID del producto en el local storage
            localStorage.setItem('productID', product.id); 
            window.location.href = "product-info.html";
        });
    });
}

// Function that will be executed when the document is fully loaded
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
    // BUSCADOR (DESAFIATE ENTREGA 3) BUSCA TANTO EN EL NOMBRE COMO EN LA DESCRIPCION
    document.getElementById('search-bar').addEventListener('input', (e) => {
        let searchValue = e.target.value.trim().toLowerCase();
        let filteredProducts = productsArray.filter(product => product.name.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue));
        showProducts(filteredProducts);
    });
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

