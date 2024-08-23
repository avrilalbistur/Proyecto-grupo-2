function validarFormulario() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username.trim() === "" || password.trim() === "") {
        return false;
    }
    localStorage.setItem('usuario', username);
    return true;
}


let btn = document.getElementById('ingresar-button');

btn.addEventListener('click',()=>{
    let validacionOk = validarFormulario();
    if(!validacionOk){
        alert("Los campos no pueden quedar vacíos.");
    }
    else{
        window.location.href = 'index.html';
    }
    
})
