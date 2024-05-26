import { fetchData } from "../../services/fetchData"
import createFetchThunk from "../../services/abstractThunk"
import {
  FETCH_CHAT_HISTORY,
  FETCH_ROOM_HISTORY,
} from "../../constants/actionTypes"
import { API_ENDPOINTS } from "../../constants/apiEndpoints"

export const fetchChatHistory = createFetchThunk(
  FETCH_CHAT_HISTORY,
  ({ currentUser, selectedUser }) =>
    fetchData(API_ENDPOINTS.CHAT_HISTORY, {
      user1: currentUser,
      user2: selectedUser,
    })
)

export const fetchRoomHistory = createFetchThunk(
  FETCH_ROOM_HISTORY,
  ({ room }) => fetchData(API_ENDPOINTS.ROOM_HISTORY, { room })
)
