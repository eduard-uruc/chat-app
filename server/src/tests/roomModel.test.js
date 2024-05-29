const mongoose = require("mongoose")
const mockingoose = require("mockingoose")
const Room = require("../models/Room")

describe("Room Model Test", () => {
  beforeAll(() => {
    mockingoose.resetAll()
  })

  it("should create a room", async () => {
    const roomData = {
      name: "Room 3",
      createdBy: "System",
    }

    mockRoom = {
      ...roomData,
      _id: "507f191e810c19729de860ea",
    }

    mockingoose(Room).toReturn(mockRoom, "save")

    const newRoom = new Room(roomData)
    const savedRoom = await newRoom.save()

    expect(savedRoom._id).toBeDefined()
    expect(savedRoom.name).toBe(roomData.name)
    expect(savedRoom.createdBy).toBe(roomData.createdBy)
  })

  it("should throw validation error if required fields are missing ", async () => {
    const newRoom = new Room({})

    let err
    try {
      await newRoom.validate()
    } catch (error) {
      err = error
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.name).toBeDefined()
    expect(err.errors.createdBy).toBeDefined()
  })
})
