const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [];

// Valida que el producto tenga todos los campos requeridos
const validateProduct = (product) => {
    return product.id && product.name && product.count !== undefined && product.currency;
};

// Ruta para agregar un producto
app.post('/products', (req, res) => {
    const product = req.body;

    if (!validateProduct(product)) {
        return res.status(400).send({ 
            message: 'Faltan datos necesarios para crear un producto: id, name, count, unitCost, currency.' 
        });
    }

    const existingProduct = products.find(p => p.id === product.id);
    if (existingProduct) {
        return res.status(400).send({ message: 'El producto con este id ya existe.' });
    }

    products.push(product);
    res.status(201).send(product);
});

// Ruta para listar todos los productos
app.get('/products', (req, res) => {
    res.send(products);
});

// Ruta para obtener un producto por su id
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send({ message: 'Producto no encontrado.' });
    }
    res.send(product);
});

// Ruta para actualizar un producto por su id
app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send({ message: 'Producto no encontrado.' });
    }

    const updatedProduct = req.body;

    if (!validateProduct(updatedProduct)) {
        return res.status(400).send({ 
            message: 'Faltan datos necesarios para actualizar el producto: id, name, count, unitCost, currency.' 
        });
    }

    Object.assign(product, updatedProduct);
    res.send(product);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
