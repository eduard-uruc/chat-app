const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  toRoom: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
})

module.exports = mongoose.model("Message", messageSchema)
