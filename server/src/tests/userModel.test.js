const mongoose = require("mongoose")
const mockingoose = require("mockingoose")
const User = require("../models/User")

describe("User Model Test", () => {
  beforeAll(() => {
    mockingoose.resetAll()
  })

  it("should create new user", async () => {
    const userData = {
      userName: "JohnDoe",
      socketID: "JpA_3dTLrMAANnB4AAAB",
      online: true,
    }

    const mockUser = {
      ...userData,
      _id: "507f191e810c19729de860ea",
    }

    mockingoose(User).toReturn(mockUser, "save")

    const newUser = new User(userData)
    const savedData = await newUser.save()

    expect(savedData._id).toBeDefined()
    expect(savedData.userName).toBe(mockUser.userName)
    expect(savedData.socketID).toBe(mockUser.socketID)
    expect(savedData.online).toBe(mockUser.online)
  })

  it("should throw validation error if required fields are missing", async () => {
    const newUser = new User({})

    let err
    try {
      await newUser.validate()
    } catch (error) {
      err = error
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.userName).toBeDefined()
    expect(err.errors.socketID).toBeDefined()
    expect(err.errors.online).toBeUndefined()
  })
})
