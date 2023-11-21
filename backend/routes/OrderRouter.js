var express = require("express");
var router = express.Router();
const orderController = require("../controller/OrderController");
const { validateAdmin, validateUser } = require("../validator/UsersValidator");

router.post("/create", validateUser, orderController.createOrder);
router.get("/getall", validateUser, orderController.getAllOrder);
router.delete("/delete/:orderId", validateAdmin, orderController.deleteById);

module.exports = router;
