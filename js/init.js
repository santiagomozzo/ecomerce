const CATEGORIES_URL = "http://localhost:3000/category/all.json";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/publish_product/publish.json";
const CATEGORY_INFO_URL = "http://localhost:3000/category_info/1234.json";
const PRODUCTS_URL = "http://localhost:3000/product/all.json";
const PRODUCT_INFO_URL = "http://localhost:3000/product_info/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/product_info_comment/5678-comments.json";
const CART_INFO_URL = "http://localhost:3000/cart/987.json";
const CART_BUY_URL = "http://localhost:3000/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  mostrarUsuario()
  document.getElementById("cerrarSesion").addEventListener("click", cerrarSesion);
});

//funcion que muestra el usuario en la barra superior
function mostrarUsuario() {
  const usuario = document.getElementById("mostrarUsuario");
  usuario.textContent = "Usuario: ";
  const infoUsuario = localStorage.getItem("usuario")
  usuario.innerHTML += `<tr><td>${infoUsuario}</td></tr>`;
};

//funcion cerrar sesion
function cerrarSesion() {
  if (localStorage.getItem("usuario")) {
    localStorage.removeItem("usuario");
    localStorage.removeItem("infoPerfil");
    window.location.href = "login.html";
  }
};