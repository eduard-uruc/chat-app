import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchData, updateData } from "../../services/fetchData"
import createFetchThunk from "../../services/abstractThunk"
import { API_ENDPOINTS } from "../../constants/apiEndpoints"
import { FETCH_ROOMS, ADD_ROOM } from "../../constants/actionTypes"
import { fetchRoomHistory } from "../messages/messagesThunks" // Import the fetch thunk

export const fetchRooms = createFetchThunk(FETCH_ROOMS, () =>
  fetchData(API_ENDPOINTS.ROOMS)
)

export const addRoom = createAsyncThunk(
  ADD_ROOM,
  async ({ roomName, currentUser }, { dispatch, rejectWithValue }) => {
    try {
      const roomData = {
        name: roomName,
        createdBy: currentUser,
      }
      const newRoom = await updateData(API_ENDPOINTS.NEW_ROOM, roomData)

      // Refetch room history after adding the new room
      await dispatch(fetchRoomHistory({ room: newRoom.name }))

      return newRoom
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
