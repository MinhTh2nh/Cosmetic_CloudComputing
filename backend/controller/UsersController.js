const UsersModel = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validator/RegisterValidator");
require("dotenv").config();

module.exports = {
  // Register user
  register: async (req, res, next) => {
    try {
      const { username, email, phoneNumber, password } = req.body;
      const obj = { username, email, phoneNumber, password };

      // Validation Register
      const { errors, isValid } = validateRegisterInput(obj);

      // if invalid / doesn't pass validation
      if (!isValid) {
        return res.status(errors.status).json(errors);
      }

      const users = await UsersModel.find();

      // Username duplicate validator
      if (users.some((user) => user.username === username)) {
        return res.status(401).json({
          status: "error",
          error: `Username "${username}" already exists!`,
        });
      }

      // Email duplicate validator
      if (users.some((user) => user.email === email)) {
        return res.status(401).json({
          status: "error",
          error: `Email "${email}" already exists!`,
        });
      }

      const result = await UsersModel.create(obj);

      res.json({
        status: "success",
        message: "Successfully created account!",
        data: result,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Login user
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(email + "----------" + password)
      const user = await UsersModel.findOne({ email: email.trim() });

      // Check if user exists
      if (!user) {
        console.log(email + "----------" + password)
        return res.status(404).json({ status: "failed", error: "Email not found" });
      }

      // Validate password
      if (password === user.password) {
        // Make payload for token
        const payload = {
          id: user._id,
          email: user.email,
          username: user.username,
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.PRIVATE_KEY,
          { expiresIn: 3155 }, 
          (err, token) => {
            res.json({
              status: "success",
              token: token,
            });
          }
        );
      } else {
        return res.status(404).json({
          status: "failed",
          error: "Password incorrect",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "failed", error: "Internal Server Error" });
    }
  },

  // Login as admin
  loginAdmin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UsersModel.findOne({ email });
      if (!user || user.email !== "admin@gmail.com") {
        return res
          .status(404)
          .json({ status: "failed", error: "Admin's email not found" });
      }

      // Validate password
      if (password === "123") {
        // Make payload for token
        const payload = {
          id: user._id,
          email: user.email,
          username: user.username,
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.PRIVATE_KEY,
          { expiresIn: 3155 }, 
          (err, token) => {
            res.json({
              status: "success",
              message: "You're an admin!",
              token: token,
            });
          }
        );
      } else {
        return res.status(404).json({
          status: "failed",
          error: "Password incorrect",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "failed", error: "Internal Server Error" });
    }
  },

  // Get all users
  getAllUsers: async (req, res, next) => {
    try {
      const result = await UsersModel.find({});
      res.status(200).json({
        status: "success",
        message: "Successfully get all users!",
        data: result,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Get user by ID
  getUserId: async (req, res, next) => {
    try {
      const result = await UsersModel.findById(req.params.userId);
      res.json({
        status: "success",
        message: `Successfully get data id of ${req.params.userId} !`,
        data: result,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Delete user by ID
  deleteById: async (req, res, next) => {
    try {
      await UsersModel.findByIdAndRemove(req.params.userId);
      res.json({
        status: "success",
        message: `Successfully delete id of ${req.params.userId} !`,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};