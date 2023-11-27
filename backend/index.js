const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const mysql = require("mysql2");
require("dotenv").config();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/UsersRouter");
const productRouter = require("./routes/ProductRouter");
// const orderRouter = require("./routes/OrderRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const connection = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL and execute a test query
connection.query('SELECT 1 + 1', (error, results, fields) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
    throw error;
  }

  console.log('Connected to MySQL!');
  connection.end(); // Close the connection after the test query
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productRouter);
// app.use("/order", orderRouter);

app.use(express.urlencoded({
  extended: false
}));

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/public", express.static("public"));
// app.use("/public/productImages", express.static("public"));

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

// app.use("/public", express.static("public"));
// app.use("/public/productImages", express.static("public"));

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use(express.static(path.join(__dirname, "public")));

// const {
//   getAllUsers,
//   getUserId,
//   addUser,
//   deleteById,
//   updateUserByID,
// } = require("./models/UsersModelDyamo");

// app.get("/users", async (req, res) => {
//   try {
//     const users = await getAllUsers();
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ err: "Something went wrong" });
//   }
// });

// app.get("/users/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await getUserId(id);
//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ err: "Something went wrong" });
//   }
// });

const port = 8081;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/product", productRouter);
// app.use("/order", orderRouter);
//For the MongoDB database -- End Here


//For the DyamoDB database -- Start Here
// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/product", productRouter);
// app.use("/orders", orderRouter);

// const port = 8081;
// app.listen(port, () => {
//     console.log(`listening on port ${port}`);
// });
//For the DyamoDB database -- End Here

//For the MySQL database -- Start Here
//For the MySQL database -- End Here


