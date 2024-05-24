import React from 'react'
import moment from 'moment'

import {
    MessageChat,
    SenderName,
    RecipientName,
    MessageContent,
    MessageText,
    MessageTimestamp
} from '../../styles/Message.styles'

const Message = ({ message, isSender }) => (
    <MessageChat key={message.id}>
        {isSender ? (
            <>
                <SenderName>You</SenderName>
                <MessageContent auto={true}>
                    <MessageText>{message.message}</MessageText>
                    <MessageTimestamp>
                        {moment(message.timestamp).fromNow()}
                    </MessageTimestamp>
                </MessageContent>
            </>
        ) : (
            <>
                <RecipientName>{message.from}</RecipientName>
                <MessageContent>
                    <MessageText>{message.message}</MessageText>
                    <MessageTimestamp>
                        {moment(message.timestamp).fromNow()}
                    </MessageTimestamp>
                </MessageContent>
            </>
        )}
    </MessageChat>
);

export default Message