//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//funcion que muestra lista de productos
const showList = (product) => {
    let htmlContentToAppend = "";
    for (let prod of product) {
        prod.product = [];

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + prod.imgSrc + `" alt="` + prod.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ prod.name +`</h4>
                        <small class="text-muted">` + prod.soldCount + ` Relevancia </small>
                    </div>
                    <p class="mb-1">` + prod.description + `</p>
                    <p>` + prod.cost + "  " + prod.currency + `</p>
                </div>
            </div>
        </a>
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



    //Rango de precios
    document.getElementById("filtrar").addEventListener("click", function () {
        const costMax = document.getElementById("max");
        const costMin = document.getElementById("min");
        const max = costMax.value;
        const min = costMin.value;
        const resultado = product.filter(showList(cost));

        if (max != undefined && min != undefined) {
            return resultado;
        } else {
            if (max === undefined || min === undefined) {
                return alert("Rellene los campos vacios!!");
            }
        }
    });

});