import React, { useEffect, useState, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import debounce from "lodash/debounce"
import SendIcon from "@mui/icons-material/Send"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import {
  StyledButtonContainer,
  StyledForm,
  StyledFileInput,
  StyledFileInputLabel,
  StyledInputMessageContainer,
  FilePreviewContainer,
} from "../../styles/styled-components/common/StyledCommon.styles"
import { StyledInputMessage } from "../../styles/styled-components/chat-footer/StyledInputMessage.styles"
import { StyledFooter } from "../../styles/styled-components/chat-footer/StyledFooter.styles"
import EmojiPicker from "../common/EmojiPicker"

import { useSocket } from "../../context/SocketContext"
import { useTheme } from "../../context/ThemeContext"
import { SOCKET_EVENTS } from "../../constants/socketEvents"
import { capitalizeFirstLetter } from "../../utils/stringUtils"
import { renderFileDisplay } from "../../utils/fileDisplayUtils"

import { getSelectedRecipient } from "../../features/users/usersSelectors"
import { selectedRoom } from "../../features/rooms/roomsSelectors"
import { addMessage } from "../../features/messages/messagesSlice"
import { uploadMessage } from "../../features/chat/chatThunks"

const ChatFooter = () => {
  const dispatch = useDispatch()
  const { socket, userName } = useSocket()
  const { theme } = useTheme()
  const recipient = useSelector(getSelectedRecipient)
  const room = useSelector(selectedRoom)
  const fileInputRef = useRef(null)
  const inputRef = useRef(null)
  const pickerRef = useRef(null)
  const [message, setMessage] = useState("")
  const [isPickerVisible, setPickerVisible] = useState(false)
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState(null)
  const currentUser = userName

  const handleTyping = useCallback(
    debounce((message) => {
      // if (socket && !room) {
      //   // to be removed (room condition)
      //   socket.emit("typing", {
      //     message,
      //     recipient: !isEmpty(room) ? room?.name : recipient?.userName,
      //     sender: currentUser,
      //   })
      // }
    }, 300),
    [socket, room, recipient, message]
  )

  const sendMessage = async (data, event) => {
    const newMessageData = {
      message,
      file,
      from: currentUser,
      to: data?.name || data?.userName,
    }

    try {
      const uploadedMessage = await dispatch(
        uploadMessage(newMessageData)
      ).unwrap()

      // Prepare the new message for socket emission
      const newMessage = {
        message: uploadedMessage.message,
        from: currentUser,
        to: data?.name || data?.userName,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        files: uploadedMessage.files,
      }

      // Emit the message through the socket
      if (socket) {
        socket.emit(event, newMessage)
        dispatch(addMessage(newMessage))
        setMessage("")
        setFile(null)
        setFileName(null)
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()

    if ((message.trim() || file) && currentUser) {
      !room
        ? sendMessage(recipient, SOCKET_EVENTS.PRIVATE_MESSAGE)
        : sendMessage(room, SOCKET_EVENTS.ROOM_MESSAGE)
    }
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const handleFileChange = (event) => {
    const file = event?.target?.files?.[0]
    setFile(file)
    setFileName(file ? file.name : "")
    inputRef.current.focus()
  }

  const removeFile = () => {
    setFile(null)
    setFileName(null)
    fileInputRef.current.value = null
    inputRef.current.focus()
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
    <StyledFooter theme={theme}>
      <StyledForm onSubmit={handleSendMessage}>
        <StyledInputMessageContainer marginTop={fileName ? 70 : 0}>
          {file && (
            <FilePreviewContainer>
              {renderFileDisplay(file)}
              <IconButton onClick={removeFile}>
                <CloseIcon />
              </IconButton>
            </FilePreviewContainer>
          )}

          <StyledInputMessage
            ref={inputRef}
            theme={theme}
            type="text"
            placeholder="Write message"
            value={message}
            onChange={handleMessageChange}
            onKeyDown={() =>
              handleTyping(`${capitalizeFirstLetter(currentUser)} is typing...`)
            }
            onKeyUp={() => handleTyping("")}
          />
        </StyledInputMessageContainer>

        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <StyledButtonContainer type="submit">
            <SendIcon />
          </StyledButtonContainer>
          <StyledButtonContainer
            color="yellow1"
            type="button"
            onClick={() => setPickerVisible(!isPickerVisible)}
          >
            <EmojiEmotionsIcon />
          </StyledButtonContainer>
          <StyledFileInputLabel htmlFor="file-upload">
            <AttachFileIcon />
          </StyledFileInputLabel>
          <StyledFileInput
            id="file-upload"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        {isPickerVisible && (
          <div ref={pickerRef} className="emoji-picker-container">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </StyledForm>
    </StyledFooter>
  )
}

export default ChatFooter
