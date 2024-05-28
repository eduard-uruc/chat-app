const express = require("express")
const mongoose = require("mongoose")
const Message = require("./models/Message")
const User = require("./models/User")
const Room = require("./models/Room")
const app = express()
const http = require("http").Server(app)
const cors = require("cors")
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
})

const PORT = 4000

let users = []
let allUsers = [] // All users in current chat room
let currentRoom = null

// const MONGO_URI = 'mongodb://localhost/chat_app';
const MONGO_URI = "mongodb://127.0.0.1:27017/chat_app"

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error)
  })

app.use(cors())
app.use(express.json())

io.on("connection", (socket) => {
  console.log(` `)
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

      // Fetch all users and emit the updated user list to all clients
      const allUsers = await User.find()
      io.emit("newUserResponse", allUsers)
    } catch (err) {
      console.error("Error:", err)
    }
  })

  socket.on("newUser", async (data) => {
    const { userName, socketID } = data
    socket.emit("identify", userName)
  })

  socket.on("typing", async (data) => {
    const { recipient, message } = data

    try {
      // Find the recipient user in the database
      const recipientUser = await User.findOne({ userName: recipient })
      if (!recipientUser) {
        console.error("Recipient user not found.")
        return
      }

      // Emit the typing event to the specified recipient
      io.to(recipientUser.socketID).emit("typingResponse", message)
      // socket.broadcast.emit('typingResponse', message);
    } catch (err) {
      console.error("Error saving message:", err)
    }
  })

  socket.on("privateMessage", async (data) => {
    const { message, from, to } = data

    try {
      // Find the recipient user in the database
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
    const newMessage = new Message({
      from: from,
      to: room,
      message: message,
    })

    try {
      await newMessage.save()

      // Broadcast the message to all users in the room except the sender
      socket.broadcast.to(to).emit("room message", newMessage)
    } catch (error) {
      console.error("Error saving message:", error)
    }
  })

  // Join a room
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

  // Handle user disconnect
  socket.on("disconnect", async () => {
    try {
      const user = await User.findOneAndUpdate(
        { socketID: socket.id },
        { online: false }
      )
      if (user) {
        console.log(`${user.userName} disconnected`)

        // Fetch all users and emit the updated user list to all clients
        const allUsers = await User.find()
        io.emit("newUserResponse", allUsers)
      }
    } catch (err) {
      console.error("Error updating user status on disconnect:", err)
    }
  })
})

app.get("/api", (req, res) => {
  res.json({ message: "Hello world" })
})

// Endpoint to fetch chat history between two users
app.get("/api/chat-history", async (req, res) => {
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
      .exec()

    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat history" })
  }
})

app.get("/api/room-history", async (req, res) => {
  const { room } = req.query

  if (!room) {
    return res.status(400).json({ error: "Room is required" })
  }

  try {
    const messages = await Message.find({ to: room }).sort("timestamp").exec()

    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat history" })
  }
})

// Endpoint to fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" })
  }
})

// Endpoint to fetch rooms
app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room.find()
    res.json(rooms)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" })
  }
})

// Endpoint to create a room
app.post("/api/newRoom", async (req, res) => {
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
})

http.listen(PORT, () => {
  console.log("app is listening on port ", PORT)
})
