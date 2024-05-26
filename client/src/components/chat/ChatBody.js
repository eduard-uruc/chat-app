import React from "react"
import { useNavigate } from "react-router-dom"
import { FaSignOutAlt } from "react-icons/fa"
import { useSelector } from "react-redux"

import ChatHistory from "./ChatHistory"
import NewConversationPlaceholder from "../placeholders/NewConversationPlaceholder"
import { BodyHeader } from "../../styles/BodyHeader"

import {
  current_user,
  selected_recipient,
} from "../../features/users/usersSelectors"
import { selectMessages } from "../../features/messages/messagesSelectors"

const ChatBody = ({ lastMessageRef }) => {
  const navigate = useNavigate()
  const messages = useSelector(selectMessages)
  const currentUser = useSelector(current_user)
  const recipient = useSelector(selected_recipient)
  const headerMessage = recipient && `Chat with ${recipient}`

  const handleLeaveChat = () => {
    localStorage.removeItem("userName")
    navigate("/")
    window.location.reload()
  }

  return (
    <>
      <BodyHeader>
        {headerMessage}
        <>
          <p style={{ marginRight: "1em", fontSize: "13px" }}>{currentUser}</p>
          <FaSignOutAlt onClick={handleLeaveChat} />
        </>
      </BodyHeader>
      <div className="message__container">
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
