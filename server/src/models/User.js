const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  socketID: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model("User", UserSchema)
