const express = require("express")
const {
  getChatHistory,
  getRoomHistory,
  getAllUsers,
} = require("../controllers/chatController")
const router = express.Router()

router.get("/chat-history", getChatHistory)
router.get("/room-history", getRoomHistory)
router.get("/users", getAllUsers)

module.exports = router
