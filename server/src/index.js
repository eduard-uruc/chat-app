const express = require("express")
const path = require("path")
const cors = require("cors")
const http = require("http")

const connectDB = require("./database/connect")
const chatRoutes = require("./routes/chatRoutes")
const roomRoutes = require("./routes/roomRoutes")
const fileRoutes = require("./routes/fileRoutes")
const setupSocketIO = require("./socket/socket")
const config = require("./config/config")
const { CONNECTION } = require("./constants/socketEvents")
const errorHandler = require("./middlewares/errorHandler")

const app = express()
const server = http.createServer(app)

connectDB()

app.use(cors())
app.use(express.json())
app.use("/api", chatRoutes)
app.use("/api", roomRoutes)
app.use("/api", fileRoutes)

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use(errorHandler)

setupSocketIO(server)

server.listen(config.PORT, () => {
  console.log("App is listening on port", config.PORT)
})
