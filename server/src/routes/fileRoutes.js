const express = require("express")
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"))
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + "-" + Date.now() + ext)
  },
})
const upload = multer({ storage })
const uploadFile = require("../controllers/fileController")
const { UPLOAD } = require("../constants/urls")
const router = express.Router()
router.post(UPLOAD, upload.single("file"), uploadFile)

module.exports = router
