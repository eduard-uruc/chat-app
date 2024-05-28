const User = require("../models/User")
const Message = require("../models/Message")

let currentRoom = null

const socketHandler = (io, socket) => {
  console.log(`⚡: ${socket.id} user just connected!`)

  socket.on("identify", async (userName) => {
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
      io.emit("newUserResponse", allUsers)
    } catch (err) {
      console.error("Error:", err)
    }
  })

  socket.on("newUser", (data) => {
    const { userName } = data
    socket.emit("identify", userName)
  })

  socket.on("typing", async (data) => {
    const { recipient, message } = data

    try {
      const recipientUser = await User.findOne({ userName: recipient })
      if (!recipientUser) {
        console.error("Recipient user not found.")
        return
      }

      io.to(recipientUser.socketID).emit("typingResponse", message)
    } catch (err) {
      console.error("Error saving message:", err)
    }
  })

  socket.on("privateMessage", async (data) => {
    const { message, from, to } = data

    try {
      const recipientUser = await User.findOne({ userName: to })
      if (!recipientUser) {
        console.error("Recipient user not found.")
        return
      }

      const newMessage = new Message({ from, to, message })
      await newMessage.save()

      io.to(recipientUser.socketID).emit("privateMessageResponse", data)
      io.to(recipientUser.socketID).emit("privateMessageNotification", data)
    } catch (err) {
      console.error("Error saving message:", err)
    }
  })

  socket.on("room message", async (data) => {
    const { from, to, room, message } = data
    const newMessage = new Message({ from, to: room, message })

    try {
      await newMessage.save()
      socket.broadcast.to(to).emit("room message", newMessage)
    } catch (error) {
      console.error("Error saving message:", error)
    }
  })

  socket.on("join room", (data) => {
    const { room: newRoom, currentUser } = data

    if (currentRoom) {
      socket.leave(currentRoom)
      console.log(`user ${currentUser} left "${currentRoom}" room`)
    }
    socket.join(newRoom)
    console.log(`user ${currentUser}{${socket.id}} joined room: ${newRoom}`)
    currentRoom = newRoom
  })

  socket.on("disconnect", async () => {
    try {
      const user = await User.findOneAndUpdate(
        { socketID: socket.id },
        { online: false }
      )
      if (user) {
        console.log(`${user.userName} disconnected`)

        const allUsers = await User.find()
        io.emit("newUserResponse", allUsers)
      }
    } catch (err) {
      console.error("Error updating user status on disconnect:", err)
    }
  })
}

module.exports = socketHandler
