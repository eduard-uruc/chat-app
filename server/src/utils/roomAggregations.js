const Room = require("../models/Room")

const getRoomWithLastMessageAggregation = () => {
  return [
    {
      $lookup: {
        from: "messages",
        localField: "_id",
        foreignField: "toRoom",
        as: "messages",
      },
    },
    {
      $addFields: {
        lastMessage: { $arrayElemAt: ["$messages.message", -1] },
        lastMessageTimestamp: { $arrayElemAt: ["$messages.timestamp", -1] },
      },
    },
    {
      $project: {
        name: 1,
        lastMessage: 1,
        lastMessageTimestamp: 1,
      },
    },
  ]
}
module.exports = {
  getRoomWithLastMessageAggregation,
}
