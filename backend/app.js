const express = require("express");
const app = express();
const port = 3000;

// CÓDIGO CASI CASI LISTO DEL DESAFIATE PARTE 2

// app.post('/', async (req,res)=>{
//     let conn;
//     try{
//         conn = await pool.getConecction();
//         const rows = await conn.query(
//             `INSERT INTO ..... VALUE(?,?,?,?)`[req.body.] //FALTA COMPLETAR COSAS
//         );

//         res.json(rows[0]);
//     }catch (error){
//         res.status(500).json({ message: "Se rompió el servidor"});
//     }finally{
//         if (conn) conn.release();
//     }
// })

document.addEventListener("DOMContentLoaded", function () {
    // Agrega el evento de submit para el formulario de login
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar que el formulario recargue la página
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Enviar la solicitud POST al backend para hacer login
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('authToken', data.token); // Guardar el token en localStorage
          console.log("Token guardado:", data.token);
        } else {
          console.error("No se recibió el token");
        }
      })
      .catch(error => {
        console.error('Error al hacer login:', error);
      });
    });
  
    // Lógica para obtener datos protegidos con el token
    document.getElementById('getProtectedData').addEventListener('click', function() {
      const token = localStorage.getItem('authToken'); // Obtener el token guardado
  
      if (!token) {
        console.log("No estás autenticado.");
        return;
      }
  
      // Realizar la solicitud a la ruta protegida con el token
      fetch('/protected', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  });
  
