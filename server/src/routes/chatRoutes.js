const express = require("express")
const {
  getChatHistory,
  getRoomHistory,
  getAllUsers,
} = require("../controllers/chatController")
const { CHAT_HISTORY, ROOM_HISTORY, USERS } = require("../constants/urls")

const router = express.Router()

router.get(CHAT_HISTORY, getChatHistory)
router.get(ROOM_HISTORY, getRoomHistory)
router.get(USERS, getAllUsers)

module.exports = router
