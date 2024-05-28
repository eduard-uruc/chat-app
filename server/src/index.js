const express = require("express")
const cors = require("cors")
const http = require("http")
const socketIO = require("socket.io")

const connectDB = require("./utils/db")
const chatRoutes = require("./routes/chatRoutes")
const roomRoutes = require("./routes/roomRoutes")
const socketHandler = require("./utils/socket")
const config = require("./utils/config")

const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
  cors: {
    origin: config.CORS_ORIGIN,
  },
})

connectDB()

app.use(cors())
app.use(express.json())
app.use("/api", chatRoutes)
app.use("/api", roomRoutes)

io.on("connection", (socket) => {
  socketHandler(io, socket)
})

server.listen(config.PORT, () => {
  console.log("App is listening on port", config.PORT)
})
