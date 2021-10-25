//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//funcion que muestra lista de productos
const showList = (product) => {
    let htmlContentToAppend = "";
    for (let prod of product) {
        prod.product = [];

        htmlContentToAppend += `
                  <div class="col-sm-6">
                      <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                          <img src="` + prod.imgSrc + `" alt="` + prod.description + `" class="bd-placeholder-img card-img-top">
                          <h4 class="mb-1">`+ prod.name + `</h4>
                          <small class="text-muted">` + prod.soldCount + ` Relevancia </small>
                          <p class="card-text">` + prod.description + `</p>
                          <p>` + prod.cost + "  " + prod.currency + `</p>
                      </a>
                  </div>     
        `

    }
    document.getElementById("list").innerHTML = htmlContentToAppend;
};



//Funcionalidad orden ascendente y descendente en funcion del precio
function sortPrecio(criteria, array) {
    let result = [];
    if (criteria === "MAX") {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) {
                return -1;
            }
            if (a.cost < b.cost) {
                return 1;
            }
            return 0;
        });
    } else {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) {
                return -1;
            }
            if (a.cost > b.cost) {
                return 1;
            }
            return 0;
        });
    }
    return result;
}

//funcionalidad relevancia descendente
function sortRelevancia(criteria, array) {
    let result = [];
    if (criteria === "MIN") {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) {
                return -1;
            }
            if (a.soldCount < b.soldCount) {
                return 1;
            }
            return 0;

        });
    }
    return result;
}



document.addEventListener("DOMContentLoaded", async function (e) {
    const product = (await getJSONData(PRODUCTS_URL)).data;
    showList(product);
    let orden = document.getElementById("orden");
    let max = document.getElementById("max-min");
    let min = document.getElementById("min-max");
    let lista = document.createElement("lista");
    let relevancia = document.getElementById("releva");
    let relevaMin = document.getElementById("releva-min");

    orden.addEventListener("click", () => {
        if (orden.value == "Precio") {
            max.addEventListener("click", () => {
                //logica ordenar max-min
                let valor = "MAX";
                let arrValor = sortPrecio(valor, product);
                lista.innerHTML = "";
                showList(arrValor);
            });
        } else {

            min.addEventListener("click", () => {
                //logica ordenar min-max
                let valor = "MIN";
                let arrValor = sortPrecio(valor, product);
                lista.innerHTML = "";
                showList(arrValor);
            });
        }
    });

    relevancia.addEventListener("click", () => {
        if (relevancia.value == "Relevancia") {
            relevaMin.addEventListener("click", () => {
                //orden descendiente segun relevancia
                let valor = "MIN";
                let arrValor = sortRelevancia(valor, product);
                lista.innerHTML = "";
                showList(arrValor);
            });
        }
    });

    //funcion que ofiltra por rango de precio
    document.getElementById("filtrar").addEventListener("click", function () {
        minCost = document.getElementById("min").value;
        maxCost = document.getElementById("max").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        showList(product)
    });
});