import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaSignOutAlt, FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import ChatBar from "../components/chat/ChatBar"
import ChatBody from "../components/chat/ChatBody"
import ChatFooter from "../components/chat/ChatFooter"
import ProfileDefault from "../components/common/ProfileDefault"
import { Header } from "../styles/styled-components/Header.styles"
import { Menu } from "../styles/styled-components/Menu.styles"
import { Main } from "../styles/styled-components/Main.styles"
import { Footer } from "../styles/styled-components/Footer.styles"

import {
  fetchChatHistory,
  fetchRoomHistory,
} from "../features/messages/messagesThunks"
import { addMessage, setTypingStatus } from "../features/messages/messagesSlice"
import { addNotification } from "../features/notifications/notificationsSlice"
import { selectMessages } from "../features/messages/messagesSelectors"
import { selected_user } from "../features/users/usersSelectors"
import { selectedRoom } from "../features/rooms/roomsSelectors"

import { useSocket } from "../SocketContext"
import { useTheme } from "../context/ThemeContext"
import { SOCKET_EVENTS } from "../constants/socketEvents"

const ChatPage = () => {
  const dispatch = useDispatch()
  const { socket, userName: currentUser } = useSocket()
  const { theme, toggleTheme } = useTheme()
  const lastMessageRef = useRef(null)
  const navigate = useNavigate()

  const messages = useSelector(selectMessages)
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

  const handleLeaveChat = () => {
    localStorage.removeItem("userName")
    navigate("/")
    window.location.reload()
  }

  return (
    <div class="grid-container">
      <Header theme={theme}>
        <div className="header-title">Chats</div>
        <div className="header-actions">
          <button className="header-btn" onClick={toggleTheme}>
            Switch Theme
          </button>
          <ProfileDefault name={currentUser} />
          <FaSignOutAlt onClick={handleLeaveChat} />
        </div>
      </Header>
      <Menu theme={theme}>
        <ChatBar />
      </Menu>
      <Main theme={theme}>
        <ChatBody lastMessageRef={lastMessageRef} />
      </Main>
      <Footer theme={theme}>
        <ChatFooter />
      </Footer>
    </div>
  )
}

export default ChatPage
