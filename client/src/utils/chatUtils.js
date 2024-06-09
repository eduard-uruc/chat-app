import find from "lodash/find"

export const getDefaultChat = (items, property, currentUser) => {
  const userOrRoom = find(items, (item) => item[property] !== currentUser)
  return userOrRoom
}

export const countMessages = (user, data) =>
  data.filter((item) => item.from === user).length
