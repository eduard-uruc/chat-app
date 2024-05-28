const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("Room", roomSchema)
