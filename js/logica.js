function signin() {
    if (!localStorage.getItem("usuario")){
        window.location.href = "login.html";
    };

};

document.addEventListener("DOMContentLoaded", () => {
    signin();
});