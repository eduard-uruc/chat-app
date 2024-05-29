const mongoose = require("mongoose")
const connectDB = require("../connect")
const Room = require("../../models/Room")

const seedRooms = async () => {
  await connectDB()

  const rooms = [
    { name: "Room1", createdBy: "System" },
    { name: "Room2", createdBy: "System" },
  ]

  await Room.insertMany(rooms)
  console.log("Rooms seeded")

  mongoose.connection.close()
}

seedRooms().catch((err) => {
  console.log("Error seeding rooms: ", err)
  mongoose.connection.close()
})
