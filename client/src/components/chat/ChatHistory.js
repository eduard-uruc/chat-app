import React from "react"
import Message from "../common/Message"
import { useSelector } from "react-redux"

import {
  selectMessages,
  selectTypingStatus,
} from "../../features/messages/messagesSelectors"
import { useSocket } from "../../SocketContext"

const ChatHistory = ({ lastMessageRef }) => {
  const { useerName: currentUser } = useSocket()
  const messages = useSelector(selectMessages)
  const typingStatus = useSelector(selectTypingStatus)

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

        <div className="typing-message">
          <p>{typingStatus}</p>
        </div>
      </>
    </div>
  )
}

export default ChatHistory
