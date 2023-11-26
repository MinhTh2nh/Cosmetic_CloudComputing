const express = require("express");
const router = express.Router();
const usersController = require("../controller/UsersController");
const usersControllerMySQL = require ("../controller/UsersControllerMySQL");
const { validateAdmin, validateUser } = require("../validator/UsersValidator");



// router.post("/register", usersController.register);
// router.post("/login", usersController.login);
// router.post("/loginadmin", usersController.loginAdmin);
// router.get("/get", usersController.getAllUsers);
// router.get("/get/:userId", validateAdmin, usersController.getUserId);
// router.delete("/delete/:userId", validateAdmin, usersController.deleteById);

router.post("/register", usersControllerMySQL.register);
router.post("/login", usersControllerMySQL.login);
router.post("/loginadmin", usersControllerMySQL.loginAdmin);
router.get("/get", usersControllerMySQL.getAllUsers);
// router.get("/get/:userId", validateAdmin, usersControllerMySQL.getUserId);
router.get("/get/:userID", usersControllerMySQL.getUserId);
router.delete(
  "/delete/:userID",
  // validateAdmin,
  usersControllerMySQL.deleteById
);

module.exports = router;
