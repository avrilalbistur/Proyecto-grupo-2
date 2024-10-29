let btn = document.getElementById('ingresar-button');

function validarFormulario() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username.trim() === "" || password.trim() === "") {
    return false;
  }
  localStorage.setItem("usuario", username);
  return true;
}

let btn = document.getElementById("ingresar-button");


<<<<<<< Updated upstream
let validateUserExistance = () =>{
    let lastUserData = localStorage.getItem("userData") || "";
    if (lastUserData){
        const {email} = JSON.parse(lastUserData);
            let currentUserEmail = document.getElementById("username").value;
            console.log(email);
            console.log(currentUserEmail);
            if(email !== currentUserEmail){
                console.log("entra");
                localStorage.removeItem("userData")
            }
    }
    
}

document.addEventListener("DOMContentLoaded", () =>{
    btn.addEventListener('click',()=>{
        let validacionOk = validarFormulario();
        if(!validacionOk){
            alert("Los campos no pueden quedar vacíos.");
        }
        else{
            validateUserExistance();
            window.location.href = 'index.html';
        }
    })
    
})

=======

btn.addEventListener("click", () => {
  let validacionOk = validarFormulario();
  if (!validacionOk) {
    alert("Los campos no pueden quedar vacíos.");
  } else {
    window.location.href = "index.html";
  }
});
>>>>>>> Stashed changes
