let form = document.getElementById('needs-validation');

// funcion para validar si el email guardado en el userData(localstorage) concuerda con el nuevo email ingrsado para restaurar los datos
let validateUserExistance = () =>{
    let lastUserData = localStorage.getItem("userData") || "";
    if (lastUserData){
        const {email} = JSON.parse(lastUserData);
        let currentUserEmail = document.getElementById("username").value;
        if(email !== currentUserEmail){
            localStorage.removeItem("userData")
        }
    }
}
// funcion para verificar el formulario.
let verifyUser = () =>{
form.addEventListener('submit', (e) =>{
    if (!form.checkValidity()){
        e.preventDefault();
        e.stopPropagation();
        form.classList.add('was-validated');

    }else{
        e.preventDefault()
        let username = document.getElementById('username').value;
        localStorage.setItem('usuario', username);
        validateUserExistance();
        window.location.href = 'index.html';
    }
},false);
}
// evento del documento//////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () =>{
    verifyUser();
})

