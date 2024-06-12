import React, { useState } from "react"
import moment from "moment"

import {
  StyledMessageChat,
  StyledMessageContent,
  StyledMessageText,
  StyledMessageTimestamp,
} from "../../styles/styled-components/chat-body/StyledMessage.styles"
import StyledAvatar from "../../styles/styled-components/common/StyledAvatar.styles"
import FileDisplay from "./FileDisplay"

import { useTheme } from "../../context/ThemeContext"

const Message = ({ message, isSender }) => {
  const { theme } = useTheme()
  const file = message?.files?.[0]

  return (
    <StyledMessageChat key={message.id}>
      {isSender ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <FileDisplay file={file} className="right" />
            <StyledMessageContent auto={true} theme={theme}>
              <StyledMessageText>{message.message}</StyledMessageText>
              <StyledMessageTimestamp>
                {moment(message.timestamp).fromNow()}
              </StyledMessageTimestamp>
            </StyledMessageContent>
          </div>
        </div>
      ) : (
        <div className="message-receiver">
          <StyledAvatar
            alt={`${message?.fromUser?.firstName} ${message?.fromUser?.lastName}`}
            src={null}
            styles={{ marginRight: 2 }}
            size={25}
          />

          <div>
            <FileDisplay file={file} className="left" />
            <StyledMessageContent theme={theme}>
              <StyledMessageText>{message.message}</StyledMessageText>
              <StyledMessageTimestamp>
                {moment(message.timestamp).fromNow()}
              </StyledMessageTimestamp>
            </StyledMessageContent>
          </div>
        </div>
      )}
    </StyledMessageChat>
  )
}

export default Message
