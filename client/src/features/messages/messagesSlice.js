import { createSlice } from "@reduxjs/toolkit"
import { fetchChatHistory, fetchRoomHistory } from "./messagesThunks"
import { addRoom } from "../rooms/roomsThunks"

const initialState = {
  messages: [],
  typingStatus: "",
  error: null,
}

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload)
    },
    setTypingStatus(state, action) {
      state.typingStatus = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.messages = action.payload
      })
      .addCase(fetchRoomHistory.fulfilled, (state, action) => {
        state.messages = action.payload
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(fetchRoomHistory.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.messages = action.payload
      })
  },
})

export const { addMessage, setTypingStatus } = messagesSlice.actions

export default messagesSlice.reducer
