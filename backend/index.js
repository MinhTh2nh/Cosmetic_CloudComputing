const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path');
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/UsersRouter");
const productRouter = require("./routes/ProductRouter");
const orderRouter = require("./routes/OrderRouter");

const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
const url = process.env.ONLINE_URL_MONGODB

mongoose.set("strictQuery" , false)
mongoose.connect(url).then(() => {
  console.log("Connect to the DB")
  app.listen(8081 , () => {
    console.log(`Node API  app is running on port 8081`)
  })
}).catch((e) => {
  console.log("Error : ", e)
})
// const UsersModel = require("./models/UsersModel");
// // Create an instance of UsersModel
// const userInstance = new UsersModel({
//   username: 'admin',
//   email: 'admin@gmail.com',
//   phoneNumber: 1234567890,
//   password: '123',
// });

// // Save the instance to the database
// userInstance.save()
//   .then(savedUser => {
//     console.log('User saved successfully:', savedUser);
//   })
//   .catch(error => {
//     console.error('Error saving user:', error);
//   });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));
app.use("/public/productImages", express.static("public"));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);