const socketHandler = require("./socketHandler")
const config = require("../config/config")
const { CONNECTION } = require("../constants/socketEvents")

const setupSocketIO = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: config.CORS_ORIGIN,
      methods: ["GET", "POST"],
    },
  })

  io.on(CONNECTION, (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)
    socketHandler(io, socket)
  })

  return io
}

module.exports = setupSocketIO
