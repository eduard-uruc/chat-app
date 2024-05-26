import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaPaperPlane } from "react-icons/fa"

import { ButtonContainer, Form } from "../../styles/Common.styles"
import { useSocket } from "../../SocketContext"
import { addMessage } from "../../features/messages/messagesSlice"
import { SOCKET_EVENTS } from "../../constants/socketEvents"

import {
  current_user,
  selected_recipient,
} from "../../features/users/usersSelectors"
import { selectedRoom } from "../../features/rooms/roomsSelectors"

const ChatFooter = () => {
  const dispatch = useDispatch()
  const { socket } = useSocket()
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

  return (
    <div className="chat__footer">
      <Form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={() => handleTyping(`${currentUser} is typing`)}
          onKeyUp={() => handleTyping("")}
        />
        <ButtonContainer type="submit">
          <FaPaperPlane />
        </ButtonContainer>
      </Form>
    </div>
  )
}

export default ChatFooter
