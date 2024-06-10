const User = require("../models/User")
const {
  IDENTIFY,
  DISCONNECT,
  NEW_USER_RESPONSE,
  TYPING,
  TYPING_RESPONSE,
} = require("../constants/socketEvents")
const {
  getUserWithLastMessage,
  getUserWithLastMessageAggregation,
} = require("../utils/userAggregations")

module.exports = (io, socket) => {
  socket.on(IDENTIFY, async (userName) => {
    try {
      let user = await getUserWithLastMessage(null, { userName })

      if (user) {
        await User.findByIdAndUpdate(user._id, {
          socketID: socket.id,
          online: true,
        })
      } else {
        user = new User({
          userName,
          firstName: "John",
          lastName: "Doe",
          socketID: socket.id,
          online: true,
        })

        await user.save()
      }

      const allUsers = await User.aggregate(
        getUserWithLastMessageAggregation(user._id)
      )

      io.emit(NEW_USER_RESPONSE, allUsers)
    } catch (err) {
      console.error("Error:", err)
    }
  })

  socket.on(TYPING, async (data) => {
    const { recipient, sender, message } = data

    try {
      const recipientUser = await getUserWithLastMessage({
        userName: recipient,
      })

      if (!recipientUser) {
        console.error("Recipient user not found.")
        return
      }

      io.to(recipientUser.socketID).emit(TYPING_RESPONSE, {
        sender,
        message,
      })
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

        const allUsers = await User.aggregate(
          getUserWithLastMessageAggregation()
        )

        io.emit(NEW_USER_RESPONSE, allUsers)
      }
    } catch (err) {
      console.error("Error updating user status on disconnect:", err)
    }
  })
}
