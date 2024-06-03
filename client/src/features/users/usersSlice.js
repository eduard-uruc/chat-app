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
      state.selectedUser = action.payload
    },
    setSelectedRecipient(state, action) {
      state.selectedRecipient = action.payload
    },
    setMenu(state, action) {
      state.selectedMenu = action.payload
    },
    setUsers(state, action) {
      // console.log("Payload: ", action.payload)
      state.users = action.payload
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUsers.fulfilled, (state, action) => {
  //     state.users = action.payload
  //   })
  // },
})

export const { setSelectedUser, setSelectedRecipient, setMenu, setUsers } =
  usersSlice.actions

export default usersSlice.reducer
