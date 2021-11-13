//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
    // muestra producto de carrito
    getJSONData(CART_INFO_URL).then(function (articulo) {
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
                    })

                    document.getElementById("menos").addEventListener("click", () => {
                        cantidad = cantidad - 1;
                        document.getElementById("cartCount").innerHTML = `<p>Cantidad: ` + cantidad + `</p>`;
                        document.getElementById("subtotal").innerHTML = `<p>SubTotal: $` + (parseInt(articles.unitCost) * parseInt(cantidad)) + `</p>`;
                        document.getElementById("sub").innerHTML = `<p>SubTotal: $` + (parseInt(articles.unitCost) * parseInt(cantidad)) + `</p>`;
                    });

                    return (parseInt(articles.unitCost) * parseInt(cantidad));

                };

                //Funcion del formulario envio
                document.getElementById("formEnvioYPago").addEventListener("submit", (e) => {
                    e.preventDefault()

                    let data = new FormData(e.target);
                    let tipoEnvio = data.get("tipoEnvio");
                    let name = document.getElementById("name").value;
                    let lastname = document.getElementById("lastname").value;
                    let street = document.getElementById("calle").value;
                    let nDoor = document.getElementById("numero").value;
                    let esquina = document.getElementById("esquina").value;
                    let postal = document.getElementById("postal").value;
                    let provincia = document.getElementById("provincia").value;
                    let country = document.getElementById("pais").value;

                    if (name && lastname && street && nDoor && esquina && postal && provincia && country && tipoEnvio) {
                        var obj = ({
                            name,
                            lastname,
                            street,
                            nDoor,
                            esquina,
                            postal,
                            provincia,
                            country,
                            tipoEnvio,
                        })

                        sessionStorage.setItem("infoEnvio", JSON.stringify(obj));
                    } else {
                        alert("¡¡Rellene campos vacios!!");
                    }



                    document.getElementById("costoEnvio").innerHTML = `<p>Costo de Envio: $` + (subTotal() * parseFloat(tipoEnvio)) + `</p>`;
                    document.getElementById("tot").innerHTML = `<p>Total: $` + ((subTotal() * parseFloat(tipoEnvio)) + subTotal()) + `</p>`;


                });
            }

        }


    });

    //form modal
    document.getElementById("btnGuardar").addEventListener("click", () => {
        const formaPago = document.getElementById("formaPago").value;
        const nCuenta = document.getElementById("numeroCuenta").value;
        const cvv = document.getElementById("codigoSeg").value;
        const ven = document.getElementById("vencimiento").value;
        const titular = document.getElementById("titular").value;
        const direccion = document.getElementById("direccionPago").value;
        const ciudad = document.getElementById("ciudadPago").value;
        const postal = document.getElementById("postalPago").value;

        if (nCuenta && cvv && ven && titular && direccion && ciudad && postal) {

            var objeto = ({
                formaPago,
                nCuenta,
                cvv,
                ven,
                titular,
                direccion,
                ciudad,
                postal,
            })

            sessionStorage.setItem("infoPago", JSON.stringify(objeto));
            
        }else { 
            alert("¡¡Rellene campos vacios!!");
        }
    });

    // Boton comprar
    document.getElementById("comprar").addEventListener("click", () => {
        if (JSON.parse(sessionStorage.getItem("infoPago")) && JSON.parse(sessionStorage.getItem("infoEnvio"))) {
            alert("¡¡Compra realizada con éxitos!!");
            window.location.href = "cart.html"
        } else {
            alert("¡¡Rellene todos los campos vacios!!")
        }

    });

});