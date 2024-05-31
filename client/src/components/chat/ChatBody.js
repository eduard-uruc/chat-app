import React from "react"
import { useSelector } from "react-redux"

import ChatHistory from "./ChatHistory"
import NewConversationPlaceholder from "../placeholders/NewConversationPlaceholder"
import { BodyHeader } from "../../styles/styled-components/BodyHeader"

import {
  current_user,
  selected_recipient,
} from "../../features/users/usersSelectors"
import { selectMessages } from "../../features/messages/messagesSelectors"

const ChatBody = ({ lastMessageRef }) => {
  const messages = useSelector(selectMessages)
  const currentUser = useSelector(current_user)
  const recipient = useSelector(selected_recipient)
  const headerMessage = recipient && `Chat with ${recipient}`

  return (
    <>
      <BodyHeader>
        {headerMessage}
        <>
          <p style={{ marginRight: "1em", fontSize: "13px" }}>{currentUser}</p>
        </>
      </BodyHeader>
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
