const { JOIN_ROOM } = require("../constants/socketEvents")

module.exports = (socket) => {
  socket.on(JOIN_ROOM, (data) => {
    const { room: newRoom, currentUser } = data

    if (socket.currentRoom) {
      socket.leave(socket.currentRoom)
      console.log(`user ${currentUser} left "${socket.currentRoom}" room`)
    }
    socket.join(newRoom?.name)
    console.log(
      `user ${currentUser}{${socket.id}} joined room: ${newRoom?.name}`
    )
    socket.currentRoom = newRoom?.name
  })
}
