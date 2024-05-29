const Message = require("../models/Message")
const User = require("../models/User")
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
      const recipientUser = await User.findOne({ userName: to })
      if (!recipientUser) {
        console.error("Recipient user not found.")
        return
      }

      const newMessage = new Message({ from, to, message })
      await newMessage.save()

      io.to(recipientUser.socketID).emit(PRIVATE_MESSAGE_RESPONSE, data)
      io.to(recipientUser.socketID).emit(PRIVATE_MESSAGE_NOTIFICATION, data)
    } catch (err) {
      console.error("Error saving message:", err)
    }
  })

  socket.on(ROOM_MESSAGE, async (data) => {
    const { from, to, room, message } = data
    const newMessage = new Message({ from, to: room, message })

    try {
      await newMessage.save()
      socket.broadcast.to(to).emit(ROOM_MESSAGE, newMessage)
    } catch (error) {
      console.error("Error saving message:", error)
    }
  })
}
