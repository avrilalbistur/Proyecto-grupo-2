let minPrice = undefined;
let maxPrice = undefined;
let productsArray;


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
//Función que se va a ejecutar cuando el contenido HTML esté cargado

document.addEventListener('DOMContentLoaded',(e)=>{
   getJSONData(PRODUCTS_URL+101+EXT_TYPE)
        .then(object =>{
            if(object.status === 'ok'){
              productsArray = object.data.products;
              showProducts(productsArray); 
              
            };
        } );

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


