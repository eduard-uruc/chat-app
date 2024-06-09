import React from "react"
import Message from "../common/Message"
import { useSelector } from "react-redux"

import { selectMessages } from "../../features/messages/messagesSelectors"
import { useSocket } from "../../context/SocketContext"

const ChatHistory = ({ lastMessageRef }) => {
  const { userName: currentUser } = useSocket()
  const messages = useSelector(selectMessages)

  return (
    <div>
      <>
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isSender={message.from === currentUser}
          />
        ))}
        <div ref={lastMessageRef} />
      </>
    </div>
  )
}

export default ChatHistory
