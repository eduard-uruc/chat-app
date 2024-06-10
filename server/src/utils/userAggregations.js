const User = require("../models/User")

const getUserWithLastMessageAggregation = (userId) => {
  return [
    {
      $lookup: {
        from: "messages",
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [
                  {
                    $and: [
                      { $eq: ["$fromUser", "$$userId"] },
                      { $eq: ["$toUser", userId] },
                    ],
                  },
                  {
                    $and: [
                      { $eq: ["$toUser", "$$userId"] },
                      { $eq: ["$fromUser", userId] },
                    ],
                  },
                ],
              },
            },
          },
          { $sort: { timestamp: -1 } },
          { $limit: 1 },
        ],
        as: "lastMessageInfo",
      },
    },
    { $unwind: { path: "$lastMessageInfo", preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        lastMessage: "$lastMessageInfo.message",
        lastMessageTimestamp: "$lastMessageInfo.timestamp",
      },
    },
    {
      $project: {
        userName: 1,
        firstName: 1,
        lastName: 1,
        socketID: 1,
        online: 1,
        lastMessage: 1,
        lastMessageTimestamp: 1,
      },
    },
  ]
}

const getUserWithLastMessage = async (userId, matchCondition) => {
  const users = await User.aggregate([
    { $match: matchCondition },
    ...getUserWithLastMessageAggregation(userId),
  ])
  return users[0] || null
}

module.exports = {
  getUserWithLastMessageAggregation,
  getUserWithLastMessage,
}
