const ProductModel = require('../models/ProductModelDynamo');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getAllProductsController = async (req, res) => {
    try {
        const { items, count } = await ProductModel.getAllProducts();
        res.json({
            users: items,
            count,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const createProductController = async (req,res) => {
        let objWithoutImage = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            productType: req.body.productType,
        };

        let obj = {
            image: req.file && req.file.path,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            productType: req.body.productType,
        };

        if (obj.image == null) {
            ProductModel
                .create(objWithoutImage)
                .then((result) => {
                    res.json({
                        status: "success",
                        message: "Successfully create product!",
                        data: result,
                    });
                })
                .catch((error) => res.status(400).json(error));
        } 
            
            else {
                ProductModel
                    .create(obj)
                    .then((result) => {
                        res.json({
                            status: "success",
                            message: "Successfully create product!",
                            data: result,
                        });
                    })
                    .catch((error) => res.status(400).json(error));
                }
}

module.exports = {
    getAllProductsController,
    createProductController,
}