const express = require('express');
const path = require('path');
const fs = require('fs');


const router = express.Router();

// Ruta para devolver todos los productos de `cart`
router.get('/cart', (req, res) => {
    const filePath = path.join(__dirname, 'apis', 'cart', 'buy.json');
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        res.sendFile(filePath);
    });
});

// Ruta para devolver todos los productos de `cats`
router.get('/categories', (req, res) => {
    const filePath = path.join(__dirname, 'apis', 'cats', 'cat.json');
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        res.sendFile(filePath);
    });
});

// Ruta para devolver productos específicos de `cats_products`
router.get('/categories/:id', (req, res) => {
    const id = req.params.id;
    const filePath = path.join(__dirname, 'apis', 'cats_products', `${id}.json`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: `Producto con ID ${id} no encontrado` });
        }
        res.sendFile(filePath);
    });
});

// Ruta para devolver productos específicos de `products`
router.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const filePath = path.join(__dirname, 'apis', 'products', `${id}.json`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: `Producto con ID ${id} no encontrado` });
        }
        res.sendFile(filePath);
    });
});

// Ruta para devolver productos de `sell`
router.get('/sell', (req, res) => {
    const filePath = path.join(__dirname, 'apis', 'sell', 'publish.json');
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        res.sendFile(filePath);
    });
});

// Ruta para devolver productos de `user_cart`
router.get('/user_cart', (req, res) => {
    const filePath = path.join(__dirname, 'apis', 'user_cart', '25801.json');
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        res.sendFile(filePath);
    });
});

module.exports = router;
