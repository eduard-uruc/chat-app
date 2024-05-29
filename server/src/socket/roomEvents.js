const { JOIN_ROOM } = require("../constants/socketEvents")

module.exports = (socket) => {
  socket.on(JOIN_ROOM, (data) => {
    const { room: newRoom, currentUser } = data

    if (socket.currentRoom) {
      socket.leave(currentRoom)
      console.log(`user ${currentUser} left "${socket.currentRoom}" room`)
    }
    socket.join(newRoom)
    console.log(`user ${currentUser}{${socket.id}} joined room: ${newRoom}`)
    socket.currentRoom = newRoom
  })
}
