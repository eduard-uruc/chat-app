const Message = require("../models/Message")
const User = require("../models/User")
const Room = require("../models/Room")
const {
  PRIVATE_MESSAGE,
  PRIVATE_MESSAGE_RESPONSE,
  PRIVATE_MESSAGE_NOTIFICATION,
  ROOM_MESSAGE,
} = require("../constants/socketEvents")

module.exports = (io, socket) => {
  socket.on(PRIVATE_MESSAGE, async (data) => {
    const { message, from, to } = data

    try {
      const fromUser = await User.findOne({ userName: from })
      const toUser = await User.findOne({ userName: to })

      if (!toUser) {
        console.error("Recipient user not found.")
        return
      }

      const newMessage = new Message({
        from,
        to,
        message,
        fromUser: fromUser._id,
        toUser: toUser._id,
      })
      await newMessage.save()

      const formattedMessage = {
        from,
        to,
        message,
        fromUser: {
          userName: fromUser.userName || null,
          firstName: fromUser.firstName || null,
          lastName: fromUser.lastName || null,
        },
        toUser: {
          userName: toUser.userName || null,
          firstName: toUser.firstName || null,
          lastName: toUser.lastName || null,
        },
      }

      io.to(toUser.socketID).emit(PRIVATE_MESSAGE_RESPONSE, formattedMessage)
      io.to(toUser.socketID).emit(
        PRIVATE_MESSAGE_NOTIFICATION,
        formattedMessage
      )
    } catch (err) {
      console.error("Error saving message:", err)
    }
  })

  socket.on(ROOM_MESSAGE, async (data) => {
    const { from, to, message } = data

    try {
      const fromUser = await User.findOne({ userName: from })
      const toRoom = await Room.findOne({ name: to })

      const newMessage = new Message({
        from,
        to,
        message,
        fromUser: fromUser._id,
        toRoom: toRoom._id,
      })

      await newMessage.save()

      const formattedMessage = {
        from,
        to,
        message,
        fromUser: {
          userName: fromUser.userName || null,
          firstName: fromUser.firstName || null,
          lastName: fromUser.lastName || null,
        },
        toRoom: {
          name: toRoom.name || null,
        },
      }

      socket.broadcast.to(to).emit(ROOM_MESSAGE, formattedMessage)
    } catch (error) {
      console.error("Error saving message:", error)
    }
  })
}
