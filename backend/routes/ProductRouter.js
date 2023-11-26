var express = require("express");
var router = express.Router();
const productController = require("../controller/ProductsController");
const { validateAdmin, validateUser } = require("../validator/UsersValidator");
const productsController = require("../controller/ProductsController");
// const productsControllerDynamoDB = require("../controller/ProductControllerDynamo");
const productsControllerMySQL = require("../controller/ProductsControllerMySQL");
const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     cb(null, "./public/productImages/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// // upload.single("image") means only upload 1 (image). you can check more options on the multer docs or go to the chat backend.
// router.post(
//   "/addproduct",
//   upload.single("image"),
//   validateAdmin,
//   productController.createProduct
// );
// router.put(
//   "/editproduct/:productId",
//   upload.single("image"),
//   validateAdmin,
//   productController.editProductById
// );
// router.get("/getproduct", productController.getAllProducts);
// router.get(
//   "/getproduct/:productId",
//   validateUser,
//   productController.getProductId
// );
// router.delete(
//   "/deleteproduct/:productId",
//   validateAdmin,
//   productController.deleteById
// );

//For MySQL
router.get("/get", productsControllerMySQL.getAllProducts);
router.post("/create", productsControllerMySQL.createProduct);
router.get("/get/:productID", productsControllerMySQL.getProuductId);
router.put("/update/:productID", productsControllerMySQL.editProductById);
router.delete("/delete/:productID", productsControllerMySQL.deleteByID);

//For the DyamoDB database -- Start Here
//Test Ok
// router.get("/get", productsControllerDynamoDB.getAllProductsController);
// router.post("/create", productsControllerDynamoDB.createProductController);
// router.get("/get/:productid", productsControllerDynamoDB.getProductByIdController);
// router.put("/update/:productid", productsControllerDynamoDB.updateProducController);
// router.delete("/delete/:productid", productsControllerDynamoDB.deleteProductController);
//Un-Test
//For the DyamoDB database -- End Here

module.exports = router;
