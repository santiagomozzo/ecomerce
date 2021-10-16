//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
    // muestra producto de carrito
    getJSONData(CART_INFO_URL).then(function (articulo) {
        var totales = document.getElementById("totales");
        if (articulo.status === "ok") {
            const product = articulo.data

            for (let articles of product.articles) {

                let img = document.getElementById("img");
                let cartName = document.getElementById("cartName");
                let cartCount = document.getElementById("cartCount");
                let precioUnitario = document.getElementById("precioUnitario");
                let subtotal = document.getElementById("subtotal");
                let sub = document.getElementById("sub");
                let total = document.getElementById("tot");

                img.innerHTML += `<img src="` + articles.src + `" alt="" class="img-thumbnail">`
                cartName.innerHTML += articles.name;
                cartCount.innerHTML += articles.count;
                precioUnitario.innerHTML += articles.unitCost;
                subtotal.innerHTML += subTotal();
                sub.innerHTML += subTotal();
                total.innerHTML += subTotal();


                //Función que calcula el subTotal
                function subTotal() {
                    let cantidad = parseInt(articles.count);
                    document.getElementById("mas").addEventListener("click", () => {
                        cantidad = cantidad + 1;
                        document.getElementById("cartCount").innerHTML = `<p>Cantidad: ` + cantidad + `</p>`;
                        document.getElementById("subtotal").innerHTML = `<p>SubTotal: \$${parseInt(articles.unitCost) * parseInt(cantidad)}</p>`;
                        document.getElementById("sub").innerHTML = `<p>SubTotal: \$${parseInt(articles.unitCost) * parseInt(cantidad)}</p>`;
                        document.getElementById("tot").innerHTML = `<p>Total: \$${parseInt(articles.unitCost) * parseInt(cantidad)}</p>`;
                    })

                    document.getElementById("menos").addEventListener("click", () => {
                        cantidad = cantidad - 1;
                        document.getElementById("cartCount").innerHTML = `<p>Cantidad: ` + cantidad + `</p>`;
                        document.getElementById("subtotal").innerHTML = `<p>SubTotal: $` + (parseInt(articles.unitCost) * parseInt(cantidad)) + `</p>`;
                        document.getElementById("sub").innerHTML = `<p>SubTotal: $` + (parseInt(articles.unitCost) * parseInt(cantidad)) + `</p>`;
                        document.getElementById("tot").innerHTML = `<p>Total: \$${parseInt(articles.unitCost) * parseInt(cantidad)}</p>`;
                    });

                    return (parseInt(articles.unitCost) * parseInt(cantidad));

                };
            }

        }
    });


    //Funcion del formulario
    document.getElementById("formEnvioYPago").addEventListener("submit", (e) => {
        e.preventDefault()

        let data = new FormData(e.target);
        let tipoEnvio = data.get("tipoEnvio");


        const formulario = document.getElementById("formEnvioYPago");

        if (formulario) {
            alert("Compra realizada con exitos!!!");

        }

    });

});