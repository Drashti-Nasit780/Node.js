const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
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
    default: "manager"
  },
  isDelete: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model("managers", managerSchema);