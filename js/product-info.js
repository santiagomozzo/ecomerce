//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var info = {};

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
}



document.addEventListener("DOMContentLoaded", async function (e) {
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

    }
  });


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

document.getElementById("btnComentar").onclick = function () {
  buttonComentarios();
}