const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mariadb = require('mariadb');
require("dotenv").config({ path: "./backend/.env" }); // Cargar variables de entorno desde el archivo .env

const app = express();
app.use(bodyParser.json()); // Para poder parsear el cuerpo de las peticiones JSON

const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY; // Recuperar la clave secreta para el JWT
console.log("SECRET_KEY:", SECRET_KEY);
// Configuración del pool de conexiones
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1202",
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
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Email y contraseña son requeridos.");
  }

  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM login WHERE email = ?", [username]);
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

// Ruta protegida
app.get("/protected", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).send("Token no proporcionado.");

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send("Token inválido.");
    res.json({ message: "Acceso concedido.", user });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});


// CÓDIGO CASI CASI LISTO DEL DESAFIATE PARTE 2

// app.post('/cart', async (req,res)=>{
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
       