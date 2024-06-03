import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { monthDayFormat } from "../../utils/timeFormatUtils"
import { capitalizeFirstLetter } from "../../utils/stringUtils"
import { getDefaultChat, countMessages } from "../../utils/chatUtils"
import { useTheme } from "../../context/ThemeContext"

import Avatar from "./Avatar"
import { Container } from "../../styles/styled-components/Container.styles"
import { ChatBarMenuItem } from "../../styles/styled-components/List.styles"

import { getNotifications } from "../../features/notifications/notificationsSelectors"
import { removeNotification } from "../../features/notifications/notificationsSlice"
import { useSocket } from "../../SocketContext"

const List = ({ items, handleRecipient, property, hasStatus = false }) => {
  const dispatch = useDispatch()
  const { theme } = useTheme()
  const { userName: currentUser } = useSocket()
  const notifications = useSelector(getNotifications)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleCurrentChat = (item) => {
    setSelectedItem(item)
    handleRecipient(item)
    dispatch(removeNotification(item))
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
      <Container position="left">
        {items?.map((item, index) => {
          const count = countMessages(item[property], notifications)

          return (
            <ChatBarMenuItem
              key={item?._id || index}
              onClick={() => handleCurrentChat(item[property])}
              isSelected={selectedItem === item[property]}
              theme={theme}
            >
              <div className="user-info-container">
                {
                  <Avatar
                    item={item}
                    hasStatus={hasStatus}
                    property={property}
                  />
                }
                <div className="user-message-preview">
                  <span className="user-name">
                    {capitalizeFirstLetter(item[property])}
                  </span>
                  <span className="message-snippet">
                    Today is I'm very happy cos...
                  </span>
                </div>
              </div>
              <div className="message-info-container">
                <span className="message-date">
                  {" "}
                  {monthDayFormat(new Date())}
                </span>
                {!!count && (
                  <span className="unread-message-count">{count}</span>
                )}
              </div>
            </ChatBarMenuItem>
          )
        })}
      </Container>
    </div>
  )
}

export default List
