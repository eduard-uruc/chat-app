import { createSlice } from "@reduxjs/toolkit"
import { fetchRooms, addRoom } from "./roomsThunks"

const initialState = {
  room: null,
  rooms: [],
  error: null,
}

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRoom(state, action) {
      state.room = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload)
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { setRoom } = roomsSlice.actions

export default roomsSlice.reducer
