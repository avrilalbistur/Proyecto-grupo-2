function validarFormulario() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username.trim() === "" || password.trim() === "") {
        alert("Los campos no pueden quedar vacíos.");
        return false;
    }

    return true;
}

let btn = document.getElementById('btn');
btn.addEventListener('click', ()=>{
    location.replace('https://avrilalbistur.github.io/Proyecto-grupo-2/')
})