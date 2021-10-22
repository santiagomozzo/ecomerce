//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("btnSign").addEventListener("click", buttonSign);

});


const buttonSign = () => {
    const txtuser = document.getElementById("user");
    const txtcontraseña = document.getElementById("contraseña");
    const user = txtuser.value;
    const contraseña = txtcontraseña.value;
    if (user && contraseña) {
        txtuser.value = "";
        txtcontraseña.value = "";

        localStorage.clear();
        localStorage.setItem("usuario", user);
    
        window.location.href = "index.html"
    } else {
        alert("Rellene los campos vacios");
    };
};
