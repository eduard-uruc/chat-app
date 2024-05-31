import React from "react"
import moment from "moment"

import {
  MessageChat,
  SenderName,
  RecipientName,
  MessageContent,
  MessageText,
  MessageTimestamp,
} from "../../styles/styled-components/Message.styles"
import Avatar from "./Avatar"

const Message = ({ message, isSender }) => (
  <MessageChat key={message.id}>
    {isSender ? (
      <div className="test1">
        <MessageContent auto={true}>
          <MessageText>{message.message}</MessageText>
          <MessageTimestamp>
            {moment(message.timestamp).fromNow()}
          </MessageTimestamp>
        </MessageContent>
      </div>
    ) : (
      <div className="test2">
        <Avatar
          item={{ userName: "Gicu", online: false, profile_picture: true }}
          hasStatus={false}
          property={"userName"}
          size="25px"
        />
        <MessageContent>
          <MessageText>{message.message}</MessageText>
          <MessageTimestamp>
            {moment(message.timestamp).fromNow()}
          </MessageTimestamp>
        </MessageContent>
      </div>
    )}
  </MessageChat>
)

export default Message
