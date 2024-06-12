import { createSlice } from "@reduxjs/toolkit"
import { uploadMessage } from "./chatThunks"

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadMessage.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.messages.push(action.payload)
      })
      .addCase(uploadMessage.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export const { addMessage } = chatSlice.actions
export default chatSlice.reducer
