const express = require("express");
const router = express.Router();
const { validateAdmin, validateUser } = require("../validator/UsersValidator");
const usersController = require("../controller/UsersController");
const usersControllerDyamoDB = require("../controller/UsersControllerDyamoDB");

//For the MongoDB database -- Start Here
// router.post("/register", usersController.register);
// router.post("/login", usersController.login);
// router.post("/loginadmin", usersController.loginAdmin);
// router.get("/get", usersController.getAllUsers);
// router.get("/get/:userId", validateAdmin, usersController.getUserId);
// router.delete("/delete/:userId", validateAdmin, usersController.deleteById);
//For the MongoDB database -- End Here

//For the DyamoDB database -- Start Here
//Test Ok
router.get("/get", usersControllerDyamoDB.getAllUsersController);
router.get("/get/:email", usersControllerDyamoDB.getUserEmailController);
router.delete("/delete/:email", usersControllerDyamoDB.deleteUserController);
router.post("/login", usersControllerDyamoDB.login);
router.post("/loginadmin", usersControllerDyamoDB.loginAdmin);
router.post("/register", usersControllerDyamoDB.registerUSer);
//Un-Test
//For the DyamoDB database -- End Here

module.exports = router;
