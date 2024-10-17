// Funcion para validar los campos obligatorios

let formValidation = () => {
  let form = document.getElementById("needs-validation");
  form.addEventListener(
    "submit",
    (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        form.classList.add("was-validated");
      } else {
        form.classList.add("was-validated");
        let userData = {
          nombre: document.getElementById("name").value,
          apellido: document.getElementById("lastName").value,
          email: document.getElementById("userEmail").value,
          segundoNombre: document.getElementById("userMiddleName").value || "",
          segundoApellido:
            document.getElementById("userSecondLastName").value || "",
          telefonoDeContacto:
            document.getElementById("userPhoneNumber").value || "",
        };
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    },
    false
  );
};

document.addEventListener("DOMContentLoaded", function () {
  const profileImage = document.getElementById("profileImage");
  const imageUpload = document.getElementById("imageUpload");
  const removeImageButton = document.getElementById("removeImageButton");
  mostrarEmail();

  // Cargar la imagen guardada en localStorage si existe
  const savedImage = localStorage.getItem("profileImage");
  if (savedImage) {
    profileImage.src = savedImage;
    profileImage.style.display = "block"; // Mostrar la imagen
    removeImageButton.style.display = "block"; // Mostrar el botón de eliminar
  }

  // Cambiar la imagen de perfil cuando se selecciona un nuevo archivo
  imageUpload.addEventListener("change", function () {
    const file = imageUpload.files[0]; // Obtener el archivo
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImage.src = e.target.result; // Establecer la imagen cargada
        profileImage.style.display = "block"; // Mostrar la imagen
        localStorage.setItem("profileImage", e.target.result); // Guardar en localStorage
        removeImageButton.style.display = "block"; // Mostrar el botón de eliminar
      };
      reader.readAsDataURL(file); // Leer el archivo como URL de datos
    }
  });

  // Evento para eliminar la imagen
  removeImageButton.addEventListener("click", function () {
    profileImage.src = ""; // Limpiar la fuente de la imagen
    profileImage.style.display = "none"; // Ocultar la imagen
    localStorage.removeItem("profileImage"); // Eliminar del localStorage
    removeImageButton.style.display = "none"; // Ocultar el botón de eliminar
    imageUpload.value = ""; // Limpiar el input de archivo
  });
});

// Función para mostrar el email en my profile desde la primera vez que se loguea

 function mostrarEmail() {
  const email = localStorage.getItem("usuario");
  const emailInput = document.getElementById("userEmail");
  if (email) {
    emailInput.value = email;
 }
  
  const userData = localStorage.getItem('userData');
  if (userData) {
    const {nombre,apellido,email,segundoNombre,segundoApellido,telefonoDeContacto} = JSON.parse(userData);
    document.getElementById("name").value = nombre;
    document.getElementById("lastName").value = apellido;
    document.getElementById("userMiddleName").value = segundoNombre;
    document.getElementById("userSecondLastName").value = segundoApellido;
    document.getElementById("userPhoneNumber").value = telefonoDeContacto
    formValidation()
  }else(
    formValidation()
  )
 };
