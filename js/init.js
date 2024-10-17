const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

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
  var username = localStorage.getItem('usuario');
  if (username) {
      document.getElementById('navbar-username').textContent = username;
  } else {
      document.getElementById('navbar-username').textContent = 'Iniciar sesión';
  }

});

//borrar usuario al cerrar sesion
function cerrarSesionMenu(){
  localStorage.removeItem("usuario");
}