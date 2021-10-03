//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var info = {};
// funcion que muestras las imagenes del producto
function showImage(array) {

  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let images = array[i];

    htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + images + `" alt="">
            </div>
        </div>
        `

    document.getElementById("productImg").innerHTML = htmlContentToAppend;
  }
};


document.addEventListener("DOMContentLoaded", async function (e) {
  //funcion que muestra la informacion del producto
  getJSONData(PRODUCT_INFO_URL).then(function (information) {
    if (information.status === "ok") {
      const info = information.data;

      let productName = document.getElementById("productName");
      let productDescription = document.getElementById("productDescription");
      let productCost = document.getElementById("productCost");
      let productCurrency = document.getElementById("productCurrency");
      let productSoldCount = document.getElementById("productSoldCount");
      let productCategory = document.getElementById("productCategory");


      productName.innerHTML = info.name;
      productDescription.innerHTML = info.description;
      productCost.innerHTML = `Precio: ` + info.cost;
      productCurrency.innerHTML = `Moneda: ` + info.currency;
      productSoldCount.innerHTML = `Vendidos: ` + info.soldCount;
      productCategory.innerHTML = `Categoria: ` + info.category;

      showImage(info.images); //imagenes

      let productoRelacionado = info.relatedProducts;


      getJSONData(PRODUCTS_URL).then(function (relatedProducts) {
        if (relatedProducts.status === "ok") {
          let related = relatedProducts.data;
          let htmlContentToAppend = "";

          for (let rel of productoRelacionado) {

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="card">
                    <div class="col-3">
                        <img src="` + related[rel].imgSrc + `" alt="card image cap"` + related[rel].name + `" class="card-img-top">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="card-title">` + related[rel].name + `</h4>
                        </div>
                        <p class="card-text">`+ related[rel].description + `</p>
                        <p class="mb-1">`+ related[rel].cost + "  " + related[rel].currency + `</p>
                    </div>
                </div>
            </a>
            `

          }
          document.getElementById("productRelated").innerHTML = htmlContentToAppend;
        }
      });
    }
  });



  //Funcion que muestra los comentarios ya predeterminados
  const showComment = (comment) => {
    const listComment = document.getElementById("listComment"); // Contenedor de toda la lista
    for (let com of comment) {
      const list = document.createElement("lis");
      com.comment = [];
      listComment.innerHTML += `<br><br><tr><td> Puntuación: ${com.score}</td></tr><br>
      <td> Comentario: ${com.description}</td><br>
      <tr><td> User: ${com.user}</td>
      </tr>`;

      listComment.appendChild(list);
    }

  };

  const comment = (await getJSONData(PRODUCT_INFO_COMMENTS_URL)).data;
  showComment(comment);

});

//funcion de casilla comentarios
function buttonComentarios() {
  const txtComentarios = document.getElementById("comentarios");
  const comentarios = txtComentarios.value;
  const listComment = document.getElementById("listComment");
  const usuario = localStorage.getItem("usuario");
  const txtPuntuacion = document.getElementById("puntuacion");
  const puntuacion = txtPuntuacion.value;
  if (comentarios) {
    txtComentarios.value = "";
    txtPuntuacion.value = "";
    listComment.innerHTML += `<br><br><tr><td> Puntuación: ${puntuacion}</td><br><td> Comentario: ${comentarios}</td><br><td> User: ${usuario}</td></tr>`;

  } else {
    alert("Comentario no debe ser vacio");
  }
};
//evento onclick al boton de comentario
document.getElementById("btnComentar").onclick = function () {
  buttonComentarios();
}