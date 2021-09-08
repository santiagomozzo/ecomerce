//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


const showList = (product) => {
    const list = document.createElement("list"); // Contenedor de toda la lista
    for (let prod of product) {
        const lis = document.createElement("lis");
        prod.product = [];
        list.innerHTML += `<tr><td>${prod.name}</td><br>
      <td>${prod.description}</td><br>
      <td>${prod.cost}</td><br>
      <td>${prod.currency}</td><br>
      <td>${prod.imgSrc}</td><br>
      <td>${prod.soldCount}</td>
      </tr>`;

        const li = document.createElement("li");

        lis.appendChild(li);
        list.appendChild(lis); // Se añade el item de product a la lista general
    }
    document.body.appendChild(list); // Se muestra en pantalla la lista total
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