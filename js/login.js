//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("btnSign").addEventListener("click", buttonSign);

});


const buttonSign = () => {
    const txtemail = document.getElementById("email");
    const txtcontraseña = document.getElementById("contraseña");
    const email = txtemail.value;
    const contraseña = txtcontraseña.value;
    if (email && contraseña) {
        txtemail.value = "";
        txtcontraseña.value = "";

        localStorage.clear();
        localStorage.setItem("usuario", email);
    
        window.location.href = "index.html"
    } else {
        alert("Rellene los campos vacios");
    };
};
