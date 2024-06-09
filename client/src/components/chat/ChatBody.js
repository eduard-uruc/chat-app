import React from "react"
import { useSelector } from "react-redux"
import isEmpty from "lodash/isEmpty"

import ChatHistory from "./ChatHistory"
import NewConversationPlaceholder from "../placeholders/NewConversationPlaceholder"
import { StyledChatBodyBanner } from "../../styles/styled-components/chat-body/StyledChatBodyBanner"
import { StyledMain } from "../../styles/styled-components/chat-body/StyledMain.styles"
import StyledAvatar from "../../styles/styled-components/common/StyledAvatar.styles"

import { getSelectedRecipient } from "../../features/users/usersSelectors"
import { selectMessages } from "../../features/messages/messagesSelectors"
import { selectTypingStatus } from "../../features/messages/messagesSelectors"
import { useTheme } from "../../context/ThemeContext"

const ChatBody = ({ lastMessageRef }) => {
  const { theme } = useTheme()
  const messages = useSelector(selectMessages)
  const recipient = useSelector(getSelectedRecipient)
  const typingStatus = useSelector(selectTypingStatus)
  const fullName =
    recipient?.name || `${recipient?.firstName} ${recipient?.lastName}`
  const isTyping =
    !!typingStatus?.message && recipient?.userName === typingStatus?.sender

  return (
    <StyledMain theme={theme}>
      <StyledChatBodyBanner theme={theme}>
        <StyledAvatar
          alt={fullName}
          src=" "
          styles={{ marginRight: 2 }}
          size={40}
          isOnline={recipient?.online}
        />
        <div>
          <p>Chat with {fullName}</p>
          {recipient?.online && <small>online now</small>}
        </div>
      </StyledChatBodyBanner>
      <div className="message-container">
        {isEmpty(recipient) ? (
          <p>Pick someone and start chatting</p>
        ) : !!messages.length ? (
          <ChatHistory lastMessageRef={lastMessageRef} />
        ) : (
          <NewConversationPlaceholder />
        )}

        <div className="typing-message-footer">
          <p> {!!isTyping && typingStatus?.message}</p>
        </div>
      </div>
    </StyledMain>
  )
}

export default ChatBody
