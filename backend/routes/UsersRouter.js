const express = require("express");
const router = express.Router();
const usersController = require("../controller/UsersController");
const { validateAdmin, validateUser } = require("../validator/UsersValidator");



router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/loginadmin", usersController.loginAdmin);
router.get("/get", usersController.getAllUsers);
router.get("/get/:userId", validateAdmin, usersController.getUserId);
router.delete("/delete/:userId", validateAdmin, usersController.deleteById);

module.exports = router;
