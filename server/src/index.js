const express = require("express")
const cors = require("cors")
const http = require("http")

const connectDB = require("./database/connect")
const chatRoutes = require("./routes/chatRoutes")
const roomRoutes = require("./routes/roomRoutes")
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

app.use(errorHandler)

setupSocketIO(server)

server.listen(config.PORT, () => {
  console.log("App is listening on port", config.PORT)
})
