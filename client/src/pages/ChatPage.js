import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import ChatBar from "../components/chat/ChatBar"
import ChatMenu from "../components/chat/ChatMenu"
import ChatBody from "../components/chat/ChatBody"
import ChatFooter from "../components/chat/ChatFooter"

import {
  fetchChatHistory,
  fetchRoomHistory,
} from "../features/messages/messagesThunks"
import { addMessage, setTypingStatus } from "../features/messages/messagesSlice"
import { addNotification } from "../features/notifications/notificationsSlice"

import { selectMessages } from "../features/messages/messagesSelectors"
import { current_user, selected_user } from "../features/users/usersSelectors"
import { selectedRoom } from "../features/rooms/roomsSelectors"

import { useSocket } from "../SocketContext"
import { SOCKET_EVENTS } from "../constants/socketEvents"

const ChatPage = () => {
  const dispatch = useDispatch()
  const { socket } = useSocket()
  const lastMessageRef = useRef(null)

  const messages = useSelector(selectMessages)
  const currentUser = useSelector(current_user)
  const selectedUser = useSelector(selected_user)
  const room = useSelector(selectedRoom)

  useEffect(() => {
    if (currentUser && selectedUser) {
      dispatch(fetchChatHistory({ currentUser, selectedUser }))
    }
  }, [currentUser, selectedUser, dispatch])

  useEffect(() => {
    if (room) {
      dispatch(fetchRoomHistory({ room }))
    }
  }, [room, dispatch])

  useEffect(() => {
    if (!socket) return

    const handlePrivateMessageResponse = (data) => {
      if (selectedUser === data?.from) {
        dispatch(addMessage(data))
      }
    }

    const handleRoomMessage = (data) => {
      dispatch(addMessage(data))
    }

    const handleTypingResponse = (data) => {
      dispatch(setTypingStatus(data))
    }

    const handlePrivateMessageNotification = (data) => {
      if (data.from !== selectedUser) {
        dispatch(addNotification(data))
      }
    }

    socket.on(
      SOCKET_EVENTS.PRIVATE_MESSAGE_NOTIFICATION,
      handlePrivateMessageNotification
    )

    socket.on(
      SOCKET_EVENTS.PRIVATE_MESSAGE_RESPONSE,
      handlePrivateMessageResponse
    )
    socket.on(SOCKET_EVENTS.ROOM_MESSAGE, handleRoomMessage)
    socket.on(SOCKET_EVENTS.TYPING_RESPONSE, handleTypingResponse)

    return () => {
      socket.off(
        SOCKET_EVENTS.PRIVATE_MESSAGE_NOTIFICATION,
        handlePrivateMessageNotification
      )
      socket.off(
        SOCKET_EVENTS.PRIVATE_MESSAGE_RESPONSE,
        handlePrivateMessageResponse
      )
      socket.off(SOCKET_EVENTS.ROOM_MESSAGE, handleRoomMessage)
      socket.off(SOCKET_EVENTS.TYPING_RESPONSE, handleTypingResponse)
    }
  }, [socket, selectedUser])

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="chat">
      <ChatMenu />
      <ChatBar />
      <div className="chat__main">
        <ChatBody lastMessageRef={lastMessageRef} />
        <ChatFooter />
      </div>
    </div>
  )
}

export default ChatPage
