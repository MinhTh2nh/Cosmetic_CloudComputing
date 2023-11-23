const UserModel = require('../models/UsersModelDyamo');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.getUserByEmail(email);
      // Check if user exists
      if (!user) {
        return res.status(404).json({ status: 'failed', error: 'Email not found' });
      }
  
      // Validate password (you should use a secure method to compare passwords)
      if (password === user.password) {
        // Make payload for token
        const payload = {
          id: user.id,
          email: user.email,
          username: user.username,
        };
  
        // Sign token
        jwt.sign(
          payload,
          process.env.PRIVATE_KEY,
          { expiresIn: '3155s' }, // Use 's' for seconds
          (err, token) => {
            res.json({
              status: 'success',
              token: token,
            });
          }
        );
      } else {
        return res.status(404).json({
          status: 'failed',
          error: 'Password incorrect',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'failed', error: 'Internal Server Error' });
    }
  };
  
  const loginAdmin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.getUserByEmail(email);
  
      if (!user || user.email !== 'admin@gmail.com') {
        return res.status(404).json({
          status: 'failed',
          error: "Admin's email not found",
        });
      }

      // Validate password (you should use a secure method to compare passwords)
      if (password === user.password) {
        // Make payload for token
        const payload = {
          id: user.id,
          email: user.email,
          username: user.username,
        };
  
        // Sign token
        jwt.sign(
          payload,
          process.env.PRIVATE_KEY,
          { expiresIn: '3155s' }, // Use 's' for seconds
          (err, token) => {
            res.json({
              status: 'success',
              message: "You're an admin!",
              token: token,
            });
          }
        );
      } else {
        return res.status(404).json({
          status: 'failed',
          error: 'Password incorrect',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'failed', error: 'Internal Server Error' });
    }
  };

const getUserEmailController = async (req, res) => {
    try {
        const email = req.params.email;
        // Call the getEmail function from the UserModel
        const user = await UserModel.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Send the response with the retrieved user
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const getUserByEmailOrPhoneNumberController = async (req, res) => {
    try {
        // Retrieve query parameters from the URL
        const { email, phoneNumber } = req.query;
        // Validate request query parameters
        if (!email && !phoneNumber) {
            return res.status(400).json({ error: 'Missing email or phoneNumber parameter' });
        }
        const user = await UserModel.getUserByEmailOrPhoneNumber(email, phoneNumber);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllUsersController = async (req, res) => {
    try {
        // Call the getAllUsers function from the UserModel
        const { items, count } = await UserModel.getAllUsers();
        // Send the response with the retrieved users
        res.json({
            users: items,
            count,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const registerUSer = async (req, res) => {
    try {
        const { email, password, phoneNumber, username } = req.body;
        
        // Validate request body (ensure required fields are present)
        if (!email || !password || !phoneNumber || !username) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const user = {
            email,
            password,
            phoneNumber,
            username,
        };
        await UserModel.addUser(user);
        return res.status(201).json({ message: 'User register successfully' });
    } catch (error) {
        console.error(error);
        // Check if it's a duplicate user error
        if (error.message.includes('User with the same email or phoneNumber already exists.')) {
            return res.status(409).json({ error: 'User with the same email or phoneNumber already exists.' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUserController  = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserInfo = req.body;
        // Call the updateUserByID function from the UserModel
        const updatedUser = await UserModel.updateUserByEmail(userId, updatedUserInfo);

        // Send the response with the updated user information
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
const deleteUserController = async (req, res) => {
    try {
        const email = req.params.email; // Use email instead of id
        // Call the deleteById function from the UserModel
        await UserModel.deleteByEmail(email);
        // Send a success response
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


module.exports = {
    login,
    loginAdmin,
    registerUSer,
    deleteUserController,
    updateUserController,
    getAllUsersController,
    getUserEmailController,
    getUserByEmailOrPhoneNumberController,
};
