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
        const { productid, name, price, description, quantity, productType, image } = req.body;

        // Create a new product object
        const newProduct = {
            id: productid,
            name,
            price,
            description,
            quantity,
            productType
        };

        if (image) {
            newProduct.image = image;
          }

        // Call the ProductModel to create the product in DynamoDB
        await ProductModel.createProduct(newProduct);

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
    deleteProductController
}