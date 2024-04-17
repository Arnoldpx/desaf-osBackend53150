const express = require('express');
const productManager = require('../src/productManager.js')

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

const PORT = 8080; 
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});



// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        await productManager.init();
        const products = productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:id', async (req, res) => {
    try {
        await productManager.init();
        const id = parseInt(req.params.id);
        const product = productManager.getProductById(id);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Endpoint para agregar un nuevo producto
app.post('/products', async (req, res) => {
    try {
        const product = req.body;
        await productManager.addProduct(product);
        res.status(201).send("Producto agregado correctamente");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint para actualizar un producto existente
app.put('/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedFields = req.body;
        await productManager.updateProduct(id, updatedFields);
        res.send("Producto actualizado correctamente");
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
});

// Endpoint para eliminar un producto
app.delete('/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await productManager.deleteProduct(id);
        res.send("Producto eliminado correctamente");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

