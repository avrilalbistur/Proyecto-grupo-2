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

document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.getElementById("profileImage");
    const imageUpload = document.getElementById("imageUpload");
    const removeImageButton = document.getElementById("removeImageButton");

    // Cargar la imagen guardada en localStorage si existe
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
        profileImage.src = savedImage;
        profileImage.style.display = 'block'; // Mostrar la imagen
        removeImageButton.style.display = 'block'; // Mostrar el botón de eliminar
    }

    // Cambiar la imagen de perfil cuando se selecciona un nuevo archivo
    imageUpload.addEventListener('change', function () {
        const file = imageUpload.files[0]; // Obtener el archivo
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result; // Establecer la imagen cargada
                profileImage.style.display = 'block'; // Mostrar la imagen
                localStorage.setItem('profileImage', e.target.result); // Guardar en localStorage
                removeImageButton.style.display = 'block'; // Mostrar el botón de eliminar
            };
            reader.readAsDataURL(file); // Leer el archivo como URL de datos
        }
    });

    // Evento para eliminar la imagen
    removeImageButton.addEventListener('click', function () {
        profileImage.src = ''; // Limpiar la fuente de la imagen
        profileImage.style.display = 'none'; // Ocultar la imagen
        localStorage.removeItem('profileImage'); // Eliminar del localStorage
        removeImageButton.style.display = 'none'; // Ocultar el botón de eliminar
        imageUpload.value = ''; // Limpiar el input de archivo
    });
});
