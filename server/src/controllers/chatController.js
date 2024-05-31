const Message = require("../models/Message")
const User = require("../models/User")

const getChatHistory = async (req, res) => {
  const { user1, user2 } = req.query

  if (!user1 || !user2) {
    return (
      res.profile -
      picture -
      status(400).json({ error: "Both user1 and user2 are required" })
    )
  }

  try {
    const messages = await Message.find({
      $or: [
        { from: user1, to: user2 },
        { from: user2, to: user1 },
      ],
    })
      .sort("timestamp")
      .exec()

    res.json(messages)
  } catch (error) {
    res.profile -
      picture -
      status(500).json({ error: "Failed to fetch chat history" })
  }
}

const getRoomHistory = async (req, res) => {
  const { room } = req.query

  if (!room) {
    return (
      res.profile - picture - status(400).json({ error: "Room is required" })
    )
  }

  try {
    const messages = await Message.find({ to: room }).sort("timestamp").exec()
    res.json(messages)
  } catch (error) {
    res.profile -
      picture -
      status(500).json({ error: "Failed to fetch chat history" })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.profile - picture - status(500).json({ error: "Failed to fetch users" })
  }
}

module.exports = {
  getChatHistory,
  getRoomHistory,
  getAllUsers,
}
