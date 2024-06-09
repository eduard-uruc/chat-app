import React from "react"
import moment from "moment"

import {
  StyledMessageChat,
  StyledMessageContent,
  StyledMessageText,
  StyledMessageTimestamp,
} from "../../styles/styled-components/chat-body/StyledMessage.styles"
import StyledAvatar from "../../styles/styled-components/common/StyledAvatar.styles"

import { useTheme } from "../../context/ThemeContext"

const Message = ({ message, isSender }) => {
  const { theme } = useTheme()

  return (
    <StyledMessageChat key={message.id}>
      {isSender ? (
        <div>
          <StyledMessageContent auto={true} theme={theme}>
            <StyledMessageText>{message.message}</StyledMessageText>
            <StyledMessageTimestamp>
              {moment(message.timestamp).fromNow()}
            </StyledMessageTimestamp>
          </StyledMessageContent>
        </div>
      ) : (
        <div className="message-receiver">
          <StyledAvatar
            alt={`${message?.fromUser?.firstName} ${message?.fromUser?.lastName}`}
            src={null}
            styles={{ marginRight: 2 }}
            size={25}
          />

          <StyledMessageContent theme={theme}>
            <StyledMessageText>{message.message}</StyledMessageText>
            <StyledMessageTimestamp>
              {moment(message.timestamp).fromNow()}
            </StyledMessageTimestamp>
          </StyledMessageContent>
        </div>
      )}
    </StyledMessageChat>
  )
}

export default Message
