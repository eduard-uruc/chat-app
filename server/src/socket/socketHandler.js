const chatEvents = require("./chatEvents")
const userEvents = require("./userEvents")
const roomEvents = require("./roomEvents")

module.exports = (io, socket) => {
  chatEvents(io, socket)
  userEvents(io, socket)
  roomEvents(socket)
}
