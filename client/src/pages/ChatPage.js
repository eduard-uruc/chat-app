import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Settings from "../components/chat/Settings"
import ChatBar from "../components/chat/ChatBar"
import ChatBody from "../components/chat/ChatBody"
import ChatFooter from "../components/chat/ChatFooter"
import {
  StyledHeader,
  StyledHeaderTitle,
} from "../styles/styled-components/chat-header/StyledHeader.styles"

import {
  fetchChatHistory,
  fetchRoomHistory,
} from "../features/messages/messagesThunks"
import { addMessage, setTypingStatus } from "../features/messages/messagesSlice"
import { addNotification } from "../features/notifications/notificationsSlice"
import { selectMessages } from "../features/messages/messagesSelectors"
import { getSelectedUser } from "../features/users/usersSelectors"
import { selectedRoom } from "../features/rooms/roomsSelectors"

import { useSocket } from "../context/SocketContext"
import { useTheme } from "../context/ThemeContext"
import { SOCKET_EVENTS } from "../constants/socketEvents"

const ChatPage = () => {
  const dispatch = useDispatch()
  const { socket, userName: currentUser } = useSocket()
  const { theme, toggleTheme } = useTheme()
  const lastMessageRef = useRef(null)
  const navigate = useNavigate()

  const messages = useSelector(selectMessages)
  const selectedUser = useSelector(getSelectedUser)?.userName
  const room = useSelector(selectedRoom)
  const roomName = room?.name

  useEffect(() => {
    if (currentUser && selectedUser) {
      dispatch(fetchChatHistory({ currentUser, selectedUser }))
    }
  }, [currentUser, selectedUser, dispatch])

  useEffect(() => {
    if (roomName) {
      dispatch(fetchRoomHistory({ room: roomName }))
    }
  }, [roomName, dispatch])

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

  const handleLeaveChat = () => {
    localStorage.removeItem("userName")
    navigate("/")
    window.location.reload()
  }

  const userDetails = { fullName: currentUser, avatar: "" }

  return (
    <div className="grid-container">
      <StyledHeader theme={theme}>
        <StyledHeaderTitle theme={theme}>Chats</StyledHeaderTitle>
        <Settings
          user={userDetails}
          toggleTheme={toggleTheme}
          logout={handleLeaveChat}
          theme={theme}
        />
      </StyledHeader>
      <ChatBar />
      <ChatBody lastMessageRef={lastMessageRef} />
      <ChatFooter />
    </div>
  )
}

export default ChatPage
