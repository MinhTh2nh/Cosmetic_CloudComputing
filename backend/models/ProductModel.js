const mongoose = require("mongoose");

const ProductModel = mongoose.Schema({
  image: {
    type: String,
    default: "public/productImages/default-product-image.jpg",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productGender: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
},{
  timestamps: true
} 
);
const Product =  mongoose.model("Product", ProductModel);
module.exports = Product
