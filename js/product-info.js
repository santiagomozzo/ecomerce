//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//const showInfo

document.addEventListener("DOMContentLoaded", function(e){
    showComentarios();

});

// mostrar los comentarios
const showComentarios = () => {
    const comentario = document.getElementById("comentario").value;
    const comentar = document.getElementById("comentar");
    const list = document.createElement("listComment");

    comentar.addEventListener("click", function() {
        list.innerHTML += "cometario: " + comentario;
    })
    document.body.appendChild(list)

}