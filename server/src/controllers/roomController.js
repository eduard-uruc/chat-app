const Room = require("../models/Room")
const {
  getRoomWithLastMessageAggregation,
} = require("../utils/roomAggregations")

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.aggregate(getRoomWithLastMessageAggregation())
    res.json(rooms)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" })
  }
}

const createRoom = async (req, res) => {
  const { name, createdBy } = req.body

  try {
    let room = await Room.findOne({ name })

    if (room) {
      return res.status(400).json({ error: "Room already exists" })
    }

    room = new Room({ name, createdBy })
    await room.save()

    res.status(201).json(room)
  } catch (error) {
    res.status(500).json({ error: "Failed to create room" })
  }
}

module.exports = {
  getRooms,
  createRoom,
}
