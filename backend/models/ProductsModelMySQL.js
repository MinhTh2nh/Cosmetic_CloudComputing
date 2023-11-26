const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const ProductsModelMySQL = sequelize.define("products", {
      image: {
        type: DataTypes.STRING,
        default: "public/productImages/default-product-image.jpg",
      },
      name: {
        type: DataTypes.STRING,
        required: true,
      },
      price: {
        type: DataTypes.STRING,
        required: true,
      },
      description: {
        type: DataTypes.STRING,
        required: true,
      },
      quantity: {
        type: DataTypes.INTERGER,
        required: true,
      },
      productType: {
        type: DataTypes.STRING,
        required: true,
      },
    });
    return ProductsModelMySQL;
}
