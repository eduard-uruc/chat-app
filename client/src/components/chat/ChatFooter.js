import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaPaperPlane, FaSmile, FaPaperclip } from "react-icons/fa"

import {
  ButtonContainer,
  Form,
  FileInput,
  FileInputLabel,
} from "../../styles/styled-components/Common.styles"
import { WriteMessage } from "../../styles/styled-components/WriteMessage.styles"

import { useSocket } from "../../SocketContext"
import { SOCKET_EVENTS } from "../../constants/socketEvents"
import { useTheme } from "../../context/ThemeContext"

import {
  current_user,
  selected_recipient,
} from "../../features/users/usersSelectors"
import { selectedRoom } from "../../features/rooms/roomsSelectors"
import { addMessage } from "../../features/messages/messagesSlice"

const ChatFooter = () => {
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()
  const { socket } = useSocket()
  const { theme } = useTheme()
  const currentUser = useSelector(current_user)
  const recipient = useSelector(selected_recipient)
  const room = useSelector(selectedRoom)

  const [message, setMessage] = useState("")

  const handleTyping = (message) => {
    if (socket && !room) {
      // to be removed (room condition)
      socket.emit("typing", {
        message,
        recipient: room ? room : recipient,
      })
    }
  }

  const sendMessage = (to, event) => {
    if (socket) {
      const newMessage = {
        message,
        from: currentUser,
        to,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        room,
      }

      socket.emit(event, newMessage)
      dispatch(addMessage(newMessage))
      setMessage("")
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && currentUser) {
      !room
        ? sendMessage(recipient, SOCKET_EVENTS.PRIVATE_MESSAGE)
        : sendMessage(room, SOCKET_EVENTS.ROOM_MESSAGE)
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    console.log("File selected:", file)
  }

  return (
    <Form onSubmit={handleSendMessage}>
      <WriteMessage
        theme={theme}
        type="text"
        placeholder="Write message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={() => handleTyping(`${currentUser} is typing`)}
        onKeyUp={() => handleTyping("")}
      />

      <ButtonContainer type="submit">
        <FaPaperPlane />
      </ButtonContainer>

      <ButtonContainer color="yellow" type="button">
        <FaSmile />
      </ButtonContainer>

      <FileInputLabel htmlFor="file-upload">
        <FaPaperclip />
      </FileInputLabel>
      <FileInput
        id="file-upload"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </Form>
  )
}

export default ChatFooter
