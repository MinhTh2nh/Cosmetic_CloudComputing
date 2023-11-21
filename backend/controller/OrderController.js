const orderModel = require("../models/OrderModel");

module.exports = {
  createOrder: (req, res, next) => {
    let obj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      country: req.body.country,
      city: req.body.city,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      postalCode: req.body.postalCode,
      products: req.body.products,
      customerId: req.body.customerId,
    };
    orderModel
      .create(obj)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => res.status(400).json(err));
  },
  getAllOrder: (req, res, next) => {
    orderModel
      .find({})
      //1st parameter must same as orderModel's field name
      //2nd parameter is for what field do you want to show
      .populate("customerId", "username email phoneNumber")
      .then((result) => {
        res.json({
          status: "success",
          message: `Successfully get data order!`,
          data: result,
        });
      })
      .catch((error) => res.status(400).json(error));
  },
  deleteById: (req, res, next) => {
    orderModel
      .findByIdAndRemove(req.params.orderId)
      .then(() => {
        res.json({
          status: "success",
          message: `Successfully delete id of ${req.params.orderId} !`,
        });
      })
      .catch((error) => res.status(400).json(error));
  },
};
