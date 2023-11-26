const productsModelMySQL = require("../models/ProductsModelMySQL");
const db = require("../config/db");
require("dotenv").config();

module.exports = {
  createProduct: (req, res) => {
    console.log(req.body.image);
    const { image, name, price, description, quantity, productType } = req.body;

    if (
      !image ||
      !name ||
      !price ||
      !description ||
      !quantity ||
      !productType
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const sql =
      "INSERT INTO products ( image, name, price, description, quantity, productType) VALUES (?,?,?,?,?,?)";
    const values = [image, name, price, description, quantity, productType];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("Error creating product: " + err.stack);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log("Product created with ID: " + results.insertId);
      res
        .status(201)
        .json({ message: "Product created successfully", data: results });
    });
  },

  editProductById: (req, res) => {
    productID = req.params.productID;
    const { image, name, price, description, quantity, productType } = req.body;
    if (
      !image ||
      !name ||
      !price ||
      !description ||
      !quantity ||
      !productType
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const sql =
      "UPDATE products SET image=?, name=?, price=?, description=?, quantity=?,productType=? WHERE = productID=?";
    const values = [
      image,
      name,
      price,
      description,
      quantity,
      productType,
      productID,
    ];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("Error editing product: " + err.stack);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.effectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      console.log("Product edited with ID: " + productId);
      res
        .status(200)
        .json({ message: "Product edited successfully", data: results });
    });
  },

  getAllProducts: async (req, res) => {
    try {
      const sql = "SELECT * FROM products";

      db.query(sql, (err, results) => {
        if (err) {
          console.error("Error fetching products: " + err.stack);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json({ products: results });
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  //get product by productID
  getProuductId: (req, res) => {
    const productID = req.params.productID;

    const sql = "SELECT * FROM products WHERE productID =?";
    const values = [productID];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("Error fetching product by ID: " + err.stack);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ product: results[0] });
    });
  },

  //delete product by productID
  deleteByID: (req, res) => {
    const productID = req.params.productID;

    const sql = "DELETE FROM products WHERE productID=?";
    const values = [productID];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("Error deleting product by ID: " + err.stack);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      console.log("Product deleted with ID: " + productId);
      res.status(200).json({ message: "Product deleted successfully" });
    });
  },
};
