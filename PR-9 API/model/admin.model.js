const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstName: String,
  lastName:String,
  email: String,
  password: String,
  phoneNumber: Number,
  image:String,
  gender: {
  type: String,
  enum: ["male", "female", "other"]
},
  position: String,
  role: {
    type: String,
    default: "admin"
  },
  isDelete: {
  type: Boolean,
  default: false
}
});

module.exports = mongoose.model("admins", adminSchema);