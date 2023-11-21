const mongoose = require("mongoose");
const saltRounds = 8;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},{
  timestamps: true
} 
);
const User =  mongoose.model("User", UserSchema);
module.exports = User
