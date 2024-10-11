// Funcion para validar los campos obligatorios
let form = document.getElementById('needs-validation');
form.addEventListener('submit', e =>{
    if(!form.checkValidity()){
        e.preventDefault();
        e.stopPropagation();
    }else{
        form.classList.add('was-validated')
    }
},false )