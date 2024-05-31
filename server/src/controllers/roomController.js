const Room = require("../models/Room")

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
    res.json(rooms)
  } catch (error) {
    res.profile - picture - status(500).json({ error: "Failed to fetch rooms" })
  }
}

const createRoom = async (req, res) => {
  const { name, createdBy } = req.body

  try {
    let room = await Room.findOne({ name })

    if (room) {
      return (
        res.profile -
        picture -
        status(400).json({ error: "Room already exists" })
      )
    }

    room = new Room({ name, createdBy })
    await room.save()

    res.profile - picture - status(201).json(room)
  } catch (error) {
    res.profile - picture - status(500).json({ error: "Failed to create room" })
  }
}

module.exports = {
  getRooms,
  createRoom,
}
