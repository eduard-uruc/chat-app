const Message = require("../models/Message")
const User = require("../models/User")
const {
  getUserWithLastMessageAggregation,
} = require("../utils/userAggregations")

const getChatHistory = async (req, res) => {
  const { user1, user2 } = req.query

  if (!user1 || !user2) {
    return res.status(400).json({ error: "Both user1 and user2 are required" })
  }

  try {
    const messages = await Message.find({
      $or: [
        { from: user1, to: user2 },
        { from: user2, to: user1 },
      ],
    })
      .sort("timestamp")
      .populate("fromUser", "firstName lastName userName")
      .populate("toUser", "firstName lastName userName")
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
      toUser: {
        userName: message.toUser ? message.toUser.userName : null,
        firstName: message.toUser ? message.toUser.firstName : null,
        lastName: message.toUser ? message.toUser.lastName : null,
      },
    }))
    res.json(formattedMessages)
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
