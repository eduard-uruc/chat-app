export const filteredUser = (data, currentUser) => {
  return data.filter((item) => item.userName !== currentUser)
}
