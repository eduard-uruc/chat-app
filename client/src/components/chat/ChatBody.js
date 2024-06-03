import React from "react"
import { useSelector } from "react-redux"

import ChatHistory from "./ChatHistory"
import NewConversationPlaceholder from "../placeholders/NewConversationPlaceholder"
import { BodyHeader } from "../../styles/styled-components/BodyHeader"

import { selected_recipient } from "../../features/users/usersSelectors"
import { selectMessages } from "../../features/messages/messagesSelectors"
import { useSocket } from "../../SocketContext"

const ChatBody = ({ lastMessageRef }) => {
  const { userName: currentUser } = useSocket()
  const messages = useSelector(selectMessages)
  const recipient = useSelector(selected_recipient)
  const headerMessage = recipient && `Chat with ${recipient}`

  console.log("currentUser ", currentUser)

  return (
    <>
      <BodyHeader>{headerMessage}</BodyHeader>
      <div className="message-container">
        {!recipient ? (
          <p>Pick someone and start chatting</p>
        ) : !!messages.length ? (
          <ChatHistory lastMessageRef={lastMessageRef} />
        ) : (
          <NewConversationPlaceholder />
        )}
      </div>
    </>
  )
}

export default ChatBody
