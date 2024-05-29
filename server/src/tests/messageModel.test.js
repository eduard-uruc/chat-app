const mongoose = require("mongoose")
const mockingoose = require("mockingoose")
const Message = require("../models/Message")

describe("Message Model Test", () => {
  beforeAll(() => {
    mockingoose.resetAll()
  })

  it("should create a message with default timestamp", async () => {
    const messageData = {
      from: "user1",
      to: "user2",
      message: "Hello, how are you?",
    }

    const mockMessage = {
      ...messageData,
      _id: "507f191e810c19729de860ea",
      timestamp: new Date(),
    }

    mockingoose(Message).toReturn(mockMessage, "save")

    const message = new Message(messageData)
    const savedMessage = await message.save()

    expect(savedMessage._id).toBeDefined()
    expect(savedMessage.from).toBe(messageData.from)
    expect(savedMessage.to).toBe(messageData.to)
    expect(savedMessage.message).toBe(messageData.message)
    expect(savedMessage.timestamp).toBeDefined()
  })

  it("should throw validation error if required fields are missing", async () => {
    const message = new Message({})

    let err
    try {
      await message.validate()
    } catch (error) {
      err = error
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.from).toBeDefined()
    expect(err.errors.to).toBeDefined()
    expect(err.errors.message).toBeDefined()
  })
})
