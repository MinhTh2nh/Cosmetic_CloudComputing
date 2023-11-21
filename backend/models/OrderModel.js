const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Add this line

const OrderModel = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "UsersModel",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderModel);
module.exports = Order;
