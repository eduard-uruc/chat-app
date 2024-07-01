const Message = require("../models/Message")
const User = require("../models/User")
const {
  getUserWithLastMessageAggregation,
} = require("../utils/userAggregations")

const { getMessageAggregation } = require("../utils/messageAggregations")

const getChatHistory = async (req, res) => {
  const { user1, user2 } = req.query

  if (!user1 || !user2) {
    return res.status(400).json({ error: "Both user1 and user2 are required" })
  }

  try {
    const messages = await Message.aggregate(
      getMessageAggregation(user1, user2)
    )

    console.log("messages", messages)

    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat history" })
  }
}

const getRoomHistory = async (req, res) => {
  const { room } = req.query

  if (!room) {
    return res.status(400).json({ error: "Room is required" })
  }

  try {
    const messages = await Message.find({ to: room })
      .sort("timestamp")
      .populate("fromUser", "firstName lastName userName")
      .populate("toRoom", "name")
      .populate("files")
      .exec()

    const formattedMessages = messages.map((message) => ({
      _id: message._id,
      from: message.from,
      to: message.to,
      message: message.message,
      timestamp: message.timestamp,
      fromUser: {
        userName: message.fromUser ? message.fromUser.userName : null,
        firstName: message.fromUser ? message.fromUser.firstName : null,
        lastName: message.fromUser ? message.fromUser.lastName : null,
      },
      toRoom: {
        name: message.toRoom ? message.toRoom.name : null,
      },
      files: message.files.map((file) => ({
        url: file.url,
        filename: file.filename,
        type: file.type,
        size: file.size,
      })),
    }))

    res.json(formattedMessages)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat history" })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const loggedInUser = await User.findOne({ userName: req.query.currentUser })
    const users = await User.aggregate(
      getUserWithLastMessageAggregation(loggedInUser._id)
    )
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" })
  }
}

module.exports = {
  getChatHistory,
  getRoomHistory,
  getAllUsers,
}
