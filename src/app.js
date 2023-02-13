//Desafio 3. SERVIDOR con EXPRESS
import express from 'express';
import ProductManager from './ProductManager.js';

const app = express()
const PORT = 4000
const manager = new ProductManager("./src/productos.json");


app.use(express.urlencoded({extended:true})) 
app.use(express.json())



app.get('/', (req, res) => {
    res.send("Servidor Express.")
})


app.get('/products', async (req,res) => {
    const products = await manager.getProducts();
    let {limit} = req.query;
    let datos;
    if(limit) {
        datos = products.slice(0, parseInt(limit));
        res.send(`Estos son los productos según límite: ${(JSON.stringify(datos))}`);
    } else {
        datos = products;
        res.send(`Productos existentes: ${(JSON.stringify(datos))}`);
    }
    
});

//Consulta de productos según id.
app.get('/products/:id', async (req,res) => {
    const product = await manager.getProductById(parseInt(req.params.id));
    product === null ? res.send("Producto inexistente") : res.send(`El producto con ID ${product.id} es el siguiente: ${(JSON.stringify(product))}`);
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
