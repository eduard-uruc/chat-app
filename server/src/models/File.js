const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  message: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
})

module.exports = mongoose.model("File", fileSchema)
