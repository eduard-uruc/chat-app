const path = require("path")
const Message = require("../models/Message")
const File = require("../models/File")

const uploadFile = async (req, res) => {
  try {
    const { from, to, message } = req.body
    const file = req.file
    let formattedMessage = {}

    if (!from || !to) {
      return res.status(400).send({ error: "Missing required fields" })
    }

    const newMessage = new Message({
      from,
      to,
      message,
      file,
    })

    const savedMessage = await newMessage.save()

    if (file) {
      const normalizedPath = path.posix.join("uploads", file.filename)
      const fileUrl = `${req.protocol}://${req.get("host")}/${normalizedPath}`

      const newFile = new File({
        url: fileUrl,
        filename: file.originalname,
        type: file.mimetype,
        size: file.size,
        message: savedMessage._id,
      })

      const savedFile = await newFile.save()

      savedMessage.files.push(savedFile._id)

      await savedMessage.save()

      formattedMessage = {
        from: savedMessage.from,
        to: savedMessage.to,
        message: savedMessage.message,
        timestamp: savedMessage.timestamp,
        _id: savedMessage._id,
        files: [
          {
            url: savedFile.url,
            filename: savedFile.filename,
            type: savedFile.type,
            size: savedFile.size,
          },
        ],
      }
    }

    res.status(201).send(formattedMessage)
  } catch (error) {
    console.error("Upload Error:", error)
    res.status(400).send(error)
  }
}

module.exports = uploadFile
