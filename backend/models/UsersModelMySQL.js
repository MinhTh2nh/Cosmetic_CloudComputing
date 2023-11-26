const bcrypt = require("bcrypt");
const saltRounds = 8;

module.exports = (sequelize, DataTypes) => {
    const UsersModelMySQL = sequelize.define("users", {
      username: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
      },
      phoneNumber: {
        type: DataTypes.INTERGER,
        required: true,
      },
      password: {
        type: DataTypes.STRING,
        required: true,
      },
    });
    // UsersModelMySQL.pre("save",function (next){
    //     this.password = bcrypt.hashSync(this.password, saltRounds);
    //     next();
    // });
    UsersModelMySQL.beforeCreate((user,option) => {
      // Hash the password before creating the user
      user.password = bcrypt.hashSync(user.password, saltRounds);
    })
    return UsersModelMySQL;
}