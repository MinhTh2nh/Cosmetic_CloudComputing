const ProductModel = require('../models/ProductModelDynamo');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getAllProductsController = async (req, res) => {
    try {
        const { items, count } = await ProductModel.getAllProducts();
        res.json({
            products: items,
            count,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const createProductController = async (req,res) => {
    try {
        const { image, name, price, description, quantity, productType } = req.body;
        // Create a new product object
         // Parse price and quantity as integers
         const parsedPrice = +price || 10000000;
         const parsedQuantity = +quantity || 10000000;
        const newProduct = {
            image,
            name,
            price: parsedPrice,
            description,
            quantity: parsedQuantity,
            productType
        }
        if (image) {
            newProduct.image = image;
          }
          console.log(newProduct , "Day la phia server nhan duoc")
        // Call the ProductModel to create the product in DynamoDB
        await ProductModel.createProduct(newProduct)
        res.json({
            message: 'Product created successfully',
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getProductByIdController = async (req, res) => {
    try {
        const { productid } = req.params;
        const product = await ProductModel.getProductId(productid);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error!' });
    }
}

const getProductByProductTypeController = async (req, res) => {
    try {
        const productType = req.params.productType;
        const products = await ProductModel.getProductByProductType(productType);

        console.log("Product Type current ", productType);
        console.log("Products length ", products.length);

        if (!products || products.length === 0) {
            return res.status(404).json({ error: 'Products not found for the specified type' });
        }

        console.log('Products:', products);
        return res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error!' });
    }
};

const updateProducController = async (req, res) => {
    try {
        const { productid } = req.params;
        const { name, price, description, quantity, productType } = req.body;
        const updatedProductInfo = {
            name,
            price,
            description,
            quantity,
            productType,
        }
        await ProductModel.updateProductById(productid, updatedProductInfo);
        return res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const deleteProductController = async (req, res) => {
    try {
        const { productid } = req.params;
        await ProductModel.deleteProductById(productid);
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    getAllProductsController,
    getProductByIdController,
    createProductController,
    updateProducController,
    getProductByProductTypeController,
    deleteProductController,
}