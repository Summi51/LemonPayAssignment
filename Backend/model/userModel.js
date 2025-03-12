const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false } 
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };


// json data example

// {
//   "email": "email@gmail.com",
//   "password":"email123"
// }