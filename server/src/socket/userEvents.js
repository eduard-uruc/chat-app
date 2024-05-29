const User = require("../models/User")
const {
  IDENTIFY,
  DISCONNECT,
  NEW_USER_RESPONSE,
  TYPING,
  TYPING_RESPONSE,
} = require("../constants/socketEvents")

module.exports = (io, socket) => {
  socket.on(IDENTIFY, async (userName) => {
    try {
      let user = await User.findOne({ userName })
      if (user) {
        user.socketID = socket.id
        user.online = true
      } else {
        user = new User({ userName, socketID: socket.id, online: true })
      }
      await user.save()

      const allUsers = await User.find()
      io.emit(NEW_USER_RESPONSE, allUsers)
    } catch (err) {
      console.error("Error:", err)
    }
  })

  socket.on(TYPING, async (data) => {
    const { recipient, message } = data

    try {
      const recipientUser = await User.findOne({ userName: recipient })
      if (!recipientUser) {
        console.error("Recipient user not found.")
        return
      }

      io.to(recipientUser.socketID).emit(TYPING_RESPONSE, message)
    } catch (err) {
      console.error("Error saving message:", err)
    }
  })

  socket.on(DISCONNECT, async () => {
    try {
      const user = await User.findOneAndUpdate(
        { socketID: socket.id },
        { online: false }
      )
      if (user) {
        console.log(`${user.userName} disconnected`)

        const allUsers = await User.find()
        io.emit(NEW_USER_RESPONSE, allUsers)
      }
    } catch (err) {
      console.error("Error updating user status on disconnect:", err)
    }
  })
}
