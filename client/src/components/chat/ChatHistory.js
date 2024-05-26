import React from "react"
import Message from "../common/Message"
import { useSelector } from "react-redux"

import { current_user } from "../../features/users/usersSelectors"
import {
  selectMessages,
  selectTypingStatus,
} from "../../features/messages/messagesSelectors"

const ChatHistory = ({ lastMessageRef }) => {
  const messages = useSelector(selectMessages)
  const typingStatus = useSelector(selectTypingStatus)
  const currentUser = useSelector(current_user)

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

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
      </>
    </div>
  )
}

export default ChatHistory
