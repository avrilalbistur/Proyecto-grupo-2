const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
require("dotenv").config(); // Cargar variables de entorno desde el archivo .env
const SECRET_KEY = process.env.SECRET_KEY; // Recuperar la clave secreta para el JWT

// Configura la conexión a MariaDB, especificando la base de datos 'users_db'
const db = mysql.createConnection({
  host: "localhost",      
  user: "root",          
  password: "tu_contraseña",
  database: "users_db"  
});

// Verifica la conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
    return;
  }
  console.log("Conexión a la base de datos establecida");
});

// Ruta para registrar un usuario
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email y contraseña son requeridos.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Inserta el nuevo usuario en la tabla 'login' dentro de la base de datos 'users_db'
  db.query(
    "INSERT INTO login (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (err, results) => {
      if (err) {
        console.error("Error al registrar el usuario:", err);
        return res.status(500).send("Error al registrar el usuario.");
      }
      res.status(201).send("Usuario registrado.");
    }
  );
});

// Ruta para hacer login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Verifica si el usuario existe en la tabla 'login'
  db.query("SELECT * FROM login WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error("Error al verificar las credenciales:", err);
      return res.status(500).send("Error al verificar las credenciales.");
    }

    const user = results[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Credenciales inválidas.");
    }

    // Genera un token JWT
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token }); // Envia el token al cliente
  });
});
