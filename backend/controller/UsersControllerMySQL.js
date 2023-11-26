const UsersModelMySQL = require("../models/UsersModelMySQL");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validator/RegisterValidator");
require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, phoneNumber, password } = req.body;
      const obj = { username, email, phoneNumber, password };

      const { errors, isValid } = validateRegisterInput(obj);

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // Adjust the saltRounds as needed
      obj.password = hashedPassword;

      if (!isValid) {
        return res.status(errors.status).json(errors);
      }

      const existingUser = " SELECT * FROM users WHERE username=?";

      db.query(existingUser, [obj.username], (err, result) => {
        if (err) {
          return res.status(500).json({
            status: "failed",
            error: "Internal Server Error",
          });
        }
        if (result.length > 0) {
          return res.status(401).json({
            status: "error",
            error: `Username "${obj.username}" already exists!`,
          });
        }
      });

      const existingEmail = "SELECT * FROM users WHERE email=?";
      db.query(existingEmail, [obj.email], (err, result) => {
        if (err) {
          return res.status(500).json({
            status: "failed",
            error: "Internal Server Error",
          });
        }
        if (result.length > 0) {
          return res.status(401).json({
            status: "error",
            error: `Email "${obj.email}" already exists!`,
          });
        }
      });

      const insertUser = "INSERT INTO users SET ?";

      db.query(insertUser, obj, (err, result) => {
        if (err) {
          return res.status(400).json(err);
        }
        res.json({
          status: "success",
          message: "Successfully created account",
          data: result,
        });
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "failed", error: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const sql = "SELECT * FROM users WHERE email = ?";
      db.query(sql, [email], async (err, result) => {
        if (err) {
          return res.status(500).json({
            status: "failed",
            error: "Internal server error",
          });
        }

        if (result.length === 0) {
          return res.status(404).json({
            status: "failed",
            error: "Email not found",
          });
        }

        const user = result[0]; // Assuming there's only one user with the given email

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          const payload = {
            userID: user.userID,
            email: user.email,
            username: user.username,
          };

          jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: 3155 },
            (err, token) => {
              if (err) {
                return res.status(500).json({
                  status: "failed",
                  error: "Error signing JWT token",
                });
              }

              res.json({
                status: "success",
                token: token,
              });
            }
          );
        } else {
          return res.status(401).json({
            status: "failed",
            error: "Password incorrect",
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        error: "Internal Server Error",
      });
    }
  },

  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const sql = "SELECT * FROM users WHERE email = ?";
      db.query(sql, [email], async (err, result) => {
        if (err) {
          return res.status(500).json({
            status: "failed",
            error: "Internal server error",
          });
        }

        if (result.length === 0 || result[0].email !== "admin@gmail.com") {
          return res.status(404).json({
            status: "failed",
            error: "Admin's email not found",
          });
        }

        const adminUser = result[0]; // Assuming there's only one user with the given email

        // Validate password
        if (password === "123") {
          // Make payload for token
          const payload = {
            userID: adminUser.userID,
            email: adminUser.email,
            username: adminUser.username,
          };

          jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: 3155 },
            (err, token) => {
              if (err) {
                return res.status(500).json({
                  status: "failed",
                  error: "Error signing JWT token",
                });
              }

              res.json({
                status: "success",
                message: "You're an admin!",
                token: token,
              });
            }
          );
        } else {
          return res.status(401).json({
            status: "failed",
            error: "Password incorrect",
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        error: "Internal Server Error",
      });
    }
  },

  //get all users
  getAllUsers: async (req, res) => {
    try {
      const sql = "SELECT * FROM users";
      // const result = await UsersModelMySQL.findAll();
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(500).json({
            status: "failed",
            error: "Error fetching all users",
          });
        }

        res.status(200).json({
          status: "success",
          message: "Successfully get all users!",
          data: result,
        });
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  //get user by ID
  getUserId: async (req, res) => {
    try {
      const userID = req.params.userID;
      const sql = "SELECT * FROM users WHERE userID = ?";
      const value = [userID];

      db.query(sql, value, (err, result) => {
        if (err) {
          return res.status(500).json({
            Error: "Error fetching users by user id",
          });
        }

        if (result.length === 0) {
          // If no user is found with the given ID
          return res.status(404).json({
            status: "failed",
            error: `User with ID ${userID} not found`,
          });
        }

        res.json({
          status: "success",
          message: `Successfully get data ID of ${userID}!`,
          data: result,
        });
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "failed", error: "Internal Server Error" });
    }
  },

  // Delete user by ID
  deleteById: async (req, res) => {
    try {
      const userID = req.params.userID;
      const sql = "DELETE FROM users WHERE userID = ?";

      db.query(sql, [userID], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            status: "failed",
            error: "Error deleting user",
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            status: "failed",
            error: `User with ID ${userID} not found`,
          });
        }

        res.json({
          status: "success",
          message: `Successfully deleted user with ID ${userID}!`,
        });
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "failed", error: "Internal Server Error" });
    }
  },
};
