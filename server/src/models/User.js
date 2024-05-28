const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
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
