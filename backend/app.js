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

