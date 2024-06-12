import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { monthDayFormat } from "../../utils/timeFormatUtils"
import { capitalizedFullString } from "../../utils/stringUtils"
import { getDefaultChat, countMessages } from "../../utils/chatUtils"
import { shortenMessage } from "../../utils/shortenStringUtils"

import { StyledContainer } from "../../styles/styled-components/common/StyledContainer"
import StyledAvatar from "../../styles/styled-components/common/StyledAvatar.styles"
import {
  StyledListItem,
  StyledMessageDate,
  StyledMessageSnipet,
  StyledUsername,
} from "../../styles/styled-components/chat-bar/StyledList.styles"

import { getNotifications } from "../../features/notifications/notificationsSelectors"
import { removeNotification } from "../../features/notifications/notificationsSlice"
import { selectTypingStatus } from "../../features/messages/messagesSelectors"
import { useSocket } from "../../context/SocketContext"
import { useTheme } from "../../context/ThemeContext"

const List = ({ items, handleRecipient, property }) => {
  const dispatch = useDispatch()
  const { theme } = useTheme()
  const { userName: currentUser } = useSocket()
  const notifications = useSelector(getNotifications)
  const typingStatus = useSelector(selectTypingStatus)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleCurrentChat = (item) => {
    setSelectedItem(item?.name || item?.userName)
    handleRecipient(item)
    dispatch(removeNotification(item?.userName))
  }

  const setDefaultChat = () => {
    const defaultChat = getDefaultChat(items, property, currentUser)
    handleCurrentChat(defaultChat)
  }

  useEffect(() => {
    setDefaultChat()
  }, [items, property, currentUser, dispatch])

  return (
    <div>
      <StyledContainer position="left">
        {items?.map((item, index) => {
          const count = countMessages(item[property], notifications)
          const fullName = item?.name || `${item.firstName} ${item.lastName}`
          const userName = item?.userName
          const isTyping =
            !!typingStatus?.message && userName === typingStatus?.sender
          const lastMessage = shortenMessage(item?.lastMessage)

          return (
            <StyledListItem
              key={item?._id || index}
              onClick={() => handleCurrentChat(item)}
              isSelected={selectedItem === item[property]}
              theme={theme}
            >
              <div className="user-info-container">
                <StyledAvatar
                  alt={fullName}
                  src={" "}
                  // src={item?.src}
                  styles={{ marginRight: 2 }}
                  isOnline={item.online}
                />

                <div className="user-message-preview">
                  <StyledUsername theme={theme}>
                    {capitalizedFullString(fullName)}
                  </StyledUsername>
                  <StyledMessageSnipet
                    theme={theme}
                    isTyping={!!typingStatus?.message}
                  >
                    {isTyping ? (
                      <span className="typing-message-chat-bar">Typing...</span>
                    ) : (
                      lastMessage
                    )}
                  </StyledMessageSnipet>
                </div>
              </div>
              <div className="message-info-container">
                <StyledMessageDate theme={theme}>
                  {" "}
                  {monthDayFormat(item?.lastMessageTimestamp)}
                </StyledMessageDate>
                {!!count && (
                  <span className="unread-message-count">{count}</span>
                )}
              </div>
            </StyledListItem>
          )
        })}
      </StyledContainer>
    </div>
  )
}

export default List
