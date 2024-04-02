class ProductManager {
    constructor() {
        this.products = []
        this.nextId = 1
    }


    addProduct(product) {
        if (!this.isProductValid(product)) {
            console.log("Error: El producto no es válido")
            return
        }

        if (this.isCodeDuplicate(product.code)) {
            console.log("Error: El código del producto ya está en uso")
            return
        }

        product.id = this.nextId++
        this.products.push(product)
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex !== -1) {
            const updatedProduct = { ...this.products[productIndex], ...updatedFields };
            this.products[productIndex] = updatedProduct;
        } else {
            console.log("Error: Producto no encontrado");
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            console.log("Producto eliminado correctamente");
        } else {
            console.log("Error: Producto no encontrado");
        }
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id)
        if (product) {
            return product
        } else {
            console.log("Error: Producto no encontrado")
        }
    }

    isProductValid(product) {
        return (
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        )
    }

    isCodeDuplicate(code) {
        return this.products.some((p) => p.code === code)
    }
}

const productManager = new ProductManager();

productManager.addProduct({
    title: "notebook",
    description: "Descripció notebook",
    price: 1000.00,
    thumbnail: 'ruta/imagen1.jpg',
    code: 'P001',
    stock: 2
});


productManager.addProduct({
    title: "monitor",
    description: "Descripción de monitor",
    price: 20.00,
    thumbnail: 'ruta/imagen2.jpg',
    code: 'P002',
    stock: 4
});

productManager.addProduct({
    title: "mouse",
    description: "Descripción de mouse",
    price: '',
    thumbnail: 'ruta/imagen3.jpg',
    code: 'P004',
    stock: 4
});

productManager.updateProduct(2,{
    description: "descripcion actualizada",
    price: 3333333.3,
    stock: 1
});
productManager.deleteProduct(1);
const productos = productManager.getProducts();




console.log(productos);

