const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
// Inicializa el carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
// Funcion para guardar el usuario en el locastorage (DESAFIATE entrega 1)
function checkLogin(){
  if(localStorage.getItem('usuario') === null){
    window.location.href = 'login.html';
  }
}
checkLogin();

//borrar usuario al cerrar sesion
function cerrarSesionMenu(){
  localStorage.removeItem("usuario");
  localStorage.getItem("profileImage") && localStorage.removeItem("profileImage");
}

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleThemeBtn = document.getElementById('toggle-theme-btn');
  
  // Comprobar el tema guardado en localStorage
  if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
  }

  // Solo agregar el listener si el botón existe
  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDarkMode = body.classList.contains('dark-mode');
      
      // Guardar la preferencia en localStorage
      localStorage.setItem('darkMode', isDarkMode);
      
      // Cambiar el icono de luna
      const moonIcon = document.querySelector('.moon-icon');
      if (moonIcon) {
        moonIcon.innerHTML = isDarkMode ? '&#9728;' : '&#9790;'; // Cambiar entre luna y sol
      }
    });
  }
  

  // script para mostrar el nombre de usuario
  let username = localStorage.getItem('usuario');
  if (username) {
      document.getElementById('navbar-username').textContent = username;
  } else {
      document.getElementById('navbar-username').textContent = 'Iniciar sesión';
  }

});

// Función para actualizar el badge del carrito
function actualizarBadge() {
  const carritoCount = document.getElementById('carritoCount'); 
  let carrito = JSON.parse(localStorage.getItem('carrito')) || []; 
  if (carritoCount) {
      carritoCount.textContent = carrito.length; // Actualiza la cantidad en el badge
  } else {
      console.error("Element 'carritoCount' no encontrado en el DOM.");
  }
}

// función para hacer el fetch POST a la API con los datos del carrito para mandarlos a la base de datos.
let saveCartItemsInDB = async () => {
  
  let moneda = JSON.stringify(localStorage.getItem("moneda"));
  try{
    const response = await fetch('http://localhost:3001/cart',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': JSON.stringify(localStorage.getItem("authToken")),
      },
      body: JSON.stringify({
        "usuario":  JSON.stringify(localStorage.getItem("usuario")),
        "moneda": moneda,
        "total": parseInt(localStorage.getItem("totalConEnvio")),
        "productos": JSON.stringify(localStorage.getItem("carrito"))
      }),
    })
    if(!response.ok){
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  }catch(error){
    console.log("ocurrió un error al enviar el carrito a la base de datos",error.message);
    
  }
}