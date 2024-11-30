// server.js
const express = require('express');
const cors = require('cors');
const router = require('./router'); // Importamos el router
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mariadb = require('mariadb');
require("dotenv").config({ path: "./backend/.env" });

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Para poder parsear el cuerpo de las peticiones JSON

const PORT = 3001;
const SECRET_KEY = process.env.SECRET_KEY; // nodeRecuperar la clave secreta para el JWT
console.log("SECRET_KEY:", SECRET_KEY);
// Configuración del pool de conexiones
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "users_db",
  connectionLimit: 5,
});  
// Ruta para registrar un usuario
app.post("/register", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send("Email y contraseña son requeridos.");
    }

    try {
      console.log(password);
      const hashedPassword = await bcrypt.hash(password, 10);
      const conn = await pool.getConnection();
      await conn.query("INSERT INTO login (email, password) VALUES (?, ?)", [email, hashedPassword]);
      conn.release(); 
  
      res.status(201).send("Usuario registrado.");
    } catch (err) {
      console.error("Error al registrar el usuario:", err);
      res.status(500).send("Error al registrar el usuario.");
    }
  });
  
  // Ruta para hacer login
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send("Email y contraseña son requeridos.");
    }
  
    try {
      const conn = await pool.getConnection();
      const rows = await conn.query("SELECT * FROM login WHERE email = ?", [email]);
      conn.release();
  
      const user = rows[0];
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send("Credenciales inválidas.");
      }
  
      // Crear y devolver el token JWT
      const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
    } catch (err) {
      console.error("Error al verificar las credenciales:", err);
      res.status(500).send("Error al verificar las credenciales.");
    }
  });
  
  // Middleware para verificar el token
  app.get("/protected", (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).send("Token no proporcionado.");
  
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).send("Token inválido.");
      res.json({ message: "Acceso concedido.", user });
    });
  });
  

// Usar el router para las rutas definidas en `router.js`
app.use('/api', router); // Prefijamos "/api" a todas las rutas

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
