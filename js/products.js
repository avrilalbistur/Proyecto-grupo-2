let productsContainer = document.getElementById('product-container')
//function to access the products
async function getData(){
    const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
    try{
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        let products = json.products;
        let productsHTML = '';

        products.forEach(product => {
            productsHTML += `
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="">
            <p>${product.description}</p>
            <p>Price: $${product.cost}</p>
            `
            
        });
        productsContainer.innerHTML = productsHTML;
    }
    catch(error){
        productsContainer.innerHTML = `<p>Ocurrió un error al cargar los productos: ${error.message}</p>`;
        console.error(error.message);
    }
};

getData();