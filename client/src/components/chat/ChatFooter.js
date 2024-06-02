import React, { useEffect, useState, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaPaperPlane, FaSmile, FaPaperclip } from "react-icons/fa"
import debounce from "lodash/debounce"

import {
  ButtonContainer,
  Form,
  FileInput,
  FileInputLabel,
} from "../../styles/styled-components/Common.styles"
import { WriteMessage } from "../../styles/styled-components/WriteMessage.styles"
import PickerContainer from "../../components/common/PickerContainer"

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
  const inputRef = useRef(null)
  const pickerRef = useRef(null)
  const [message, setMessage] = useState("")
  const [isPickerVisible, setPickerVisible] = useState(false)
  const dispatch = useDispatch()
  const { socket } = useSocket()
  const { theme } = useTheme()
  const currentUser = useSelector(current_user)
  const recipient = useSelector(selected_recipient)
  const room = useSelector(selectedRoom)

  const handleTyping = useCallback(
    debounce((message) => {
      if (socket && !room) {
        // to be removed (room condition)
        socket.emit("typing", {
          message,
          recipient: room ? room : recipient,
        })
      }
    }, 300),
    [socket, room, recipient]
  )

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

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    console.log("File selected:", file)
  }

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + event.emoji)
    setPickerVisible(false)
    inputRef.current.focus()
  }

  const handleClick = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setPickerVisible(false)
    }
  }

  const handleEscapePress = (event) => {
    if (event.key === "Escape") {
      setPickerVisible(false)
    }
  }

  useEffect(() => {
    if (isPickerVisible) {
      document.addEventListener("mousedown", handleClick)
      document.addEventListener("keydown", handleEscapePress)
    } else {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleEscapePress)
    }

    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleEscapePress)
    }
  }, [isPickerVisible])

  return (
    <Form onSubmit={handleSendMessage}>
      <WriteMessage
        ref={inputRef}
        theme={theme}
        type="text"
        placeholder="Write message"
        value={message}
        onChange={handleMessageChange}
        onKeyDown={() => handleTyping(`${currentUser} is typing`)}
        onKeyUp={() => handleTyping("")}
      />
      <ButtonContainer type="submit">
        <FaPaperPlane />
      </ButtonContainer>
      <ButtonContainer
        color="yellow"
        type="button"
        onClick={() => setPickerVisible(!isPickerVisible)}
      >
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
      {isPickerVisible && (
        <div ref={pickerRef} className="emoji-picker-container">
          <PickerContainer onEmojiClick={onEmojiClick} />
        </div>
      )}
    </Form>
  )
}

export default ChatFooter
