const fs = require('fs').promises;

class ProductManager {
    constructor() {
        this.fileName = 'productos.json';
        this.products = [];
    }

    async init() {
        try {
            const data = await fs.readFile(this.fileName, 'utf-8');
            this.products = JSON.parse(data);
            console.log("Productos cargados correctamente desde el archivo:", this.fileName);
        } catch (error) {
            console.error("Error al cargar productos desde el archivo:", error);
        }
    }

    async saveToFile() {
        try {
            await fs.writeFile(this.fileName, JSON.stringify(this.products, null, 2), 'utf-8');
            console.log("Productos guardados correctamente en el archivo:", this.fileName);
        } catch (error) {
            console.error("Error al guardar productos en el archivo:", error);
        }
    }

    async addProduct(product) {
        try {
            await this.init();
            if (!this.isProductValid(product)) {
                console.log("Error: El producto no es válido");
                return;
            }

            if (this.isCodeDuplicate(product.code)) {
                console.log("Error: El código del producto ya está en uso");
                return;
            }

            const lastId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
            product.id = lastId + 1;
            this.products.push(product);
            await this.saveToFile();
        } catch (error) {
            console.error("Error al añadir producto:", error);
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            await this.init();
            const productIndex = this.products.findIndex((p) => p.id === id);
            if (productIndex !== -1) {
                this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
                await this.saveToFile();
                console.log("Producto actualizado correctamente");
            } else {
                console.log("Error: Producto no encontrado");
            }
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    }

    async deleteProduct(id) {
        try {
            await this.init();
            const productIndex = this.products.findIndex((p) => p.id === id);
            if (productIndex !== -1) {
                this.products.splice(productIndex, 1);
                await this.saveToFile();
                console.log("Producto eliminado correctamente");
            } else {
                console.log("Error: Producto no encontrado");
            }
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (product) {
            return product;
        } else {
            console.log("Error: Producto no encontrado");
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
        );
    }

    isCodeDuplicate(code) {
        return this.products.some((p) => p.code === code);
    }
}

const productManager = new ProductManager();

(async () => {
    await productManager.addProduct({
        title: "notebook",
        description: "Descripción notebook",
        price: 1000.00,
        thumbnail: 'ruta/imagen1.jpg',
        code: 'P001',
        stock: 2
    });

    await productManager.addProduct({
        title: "monitor",
        description: "Descripción de monitor",
        price: 20.00,
        thumbnail: 'ruta/imagen2.jpg',
        code: 'P002',
        stock: 4
    });

    await productManager.addProduct({
        title: "mouse",
        description: "Descripción de mouse",
        price: '',
        thumbnail: 'ruta/imagen3.jpg',
        code: 'P004',
        stock: 4
    });

    await productManager.updateProduct(2, {
        description: "descripcion actualizada",
        price: 3333333.3,
        stock: 1
    });

    await productManager.deleteProduct(1);

    const productos = productManager.getProducts();
    console.log(productos);
})();