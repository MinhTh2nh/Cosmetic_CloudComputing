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
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));
app.use("/public/productImages", express.static("public"));

//For the MongoDB database -- Start Here
// const mongoose = require("mongoose");
// const url = process.env.ONLINE_URL_MONGODB
// mongoose.set("strictQuery", false)
// mongoose.connect(url).then(() => {
//   console.log("Connect to the DB")
//   app.listen(8081, () => {
//     console.log(`Node API  app is running on port 8081`)
//   })
// }).catch((e) => {
//   console.log("Error : ", e)
// })

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/product", productRouter);
// app.use("/order", orderRouter);
//For the MongoDB database -- End Here


//For the DyamoDB database -- Start Here
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);
// app.use("/order", orderRouter);
const port = 8081;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
//For the DyamoDB database -- End Here

//For the MySQL database -- Start Here
//For the MySQL database -- End Here


