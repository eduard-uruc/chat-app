const express = require("express")
const { getRooms, createRoom } = require("../controllers/roomController")
const { ROOMS, NEW_ROOM } = require("../constants/urls")

const router = express.Router()

router.get(ROOMS, getRooms)
router.post(NEW_ROOM, createRoom)

module.exports = router
