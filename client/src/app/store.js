import { configureStore } from "@reduxjs/toolkit"
import messagesReducer from "../features/messages/messagesSlice"
import usersReducer from "../features/users/usersSlice"
import roomsReducer from "../features/rooms/roomsSlice"
import notificationsReducer from "../features/notifications/notificationsSlice"

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    users: usersReducer,
    rooms: roomsReducer,
    notifications: notificationsReducer,
  },
})

export default store
