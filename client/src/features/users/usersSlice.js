import { createSlice } from "@reduxjs/toolkit"
import { users } from "../../constants/common"

const initialState = {
  currentUser: localStorage.getItem("userName"),
  selectedUser: null,
  selectedRecipient: null,
  selectedMenu: users,
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedUser(state, action) {
      console.log("selected user action ", action)
      state.selectedUser = action.payload
    },
    setSelectedRecipient(state, action) {
      state.selectedRecipient = action.payload
    },
    setMenu(state, action) {
      state.selectedMenu = action.payload
    },
  },
})

export const { setSelectedUser, setSelectedRecipient, setMenu } =
  usersSlice.actions

export default usersSlice.reducer
