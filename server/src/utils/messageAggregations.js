const getMessageAggregation = (user1, user2) => {
  return [
    {
      $match: {
        $or: [
          { from: user1, to: user2 },
          { from: user2, to: user1 },
        ],
      },
    },
    {
      $sort: { timestamp: 1 },
    },
    {
      $lookup: {
        from: "users",
        localField: "from",
        foreignField: "userName",
        as: "fromUser",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "to",
        foreignField: "userName",
        as: "toUser",
      },
    },
    {
      $unwind: "$fromUser",
    },
    {
      $unwind: "$toUser",
    },
    {
      $lookup: {
        from: "files",
        localField: "files",
        foreignField: "_id",
        as: "fileDetails",
      },
    },
  ]
}

module.exports = {
  getMessageAggregation,
}
