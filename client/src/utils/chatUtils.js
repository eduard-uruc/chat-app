import get from "lodash/get"
import find from "lodash/find"

export const getDefaultChat = (items, property, currentUser) => {
  const userOrRoom = find(items, (item) => item[property] !== currentUser)
  return get(userOrRoom, property, null)
}

export const countMessages = (user, data) =>
  data.filter((item) => item.from === user).length
