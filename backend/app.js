// server.js
const express = require('express');
const cors = require('cors');
const router = require('router'); // Importamos el router

const app = express();
app.use(cors());

const PORT = 3000;

// Usar el router para las rutas definidas en `router.js`
app.use('/api', router); // Prefijamos "/api" a todas las rutas

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
