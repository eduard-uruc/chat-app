const mongoose = require("mongoose")
const connectDB = require("../connect")
const User = require("../../models/User")

const seedUsers = async () => {
  await connectDB()

  const users = [
    { userName: "John", socketID: "123", online: true },
    { userName: "Marie", socketID: "456", online: false },
  ]

  await User.insertMany(users)
  console.log("Users seeded")

  mongoose.connection.close()
}

seedUsers().catch((err) => {
  console.error("Error seeding users: ", err)
  mongoose.connection.close()
})
