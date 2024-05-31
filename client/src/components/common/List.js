import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { monthDayFormat } from "../../utils/timeFormatUtils"
import { capitalizeFirstLetter } from "../../utils/stringUtils"
import { useTheme } from "../../context/ThemeContext"

import Avatar from "./Avatar"
import { Container } from "../../styles/styled-components/Container.styles"
import { ChatBarMenuItem } from "../../styles/styled-components/List.styles"

import { getNotifications } from "../../features/notifications/notificationsSelectors"
import { removeNotification } from "../../features/notifications/notificationsSlice"

const List = ({ items, handleClick, property, hasStatus = false }) => {
  const dispatch = useDispatch()
  const { theme } = useTheme()
  const notifications = useSelector(getNotifications)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleItemClick = (item) => {
    setSelectedItem(item[property])
    handleClick(item[property])
    dispatch(removeNotification(item[property]))
  }

  const countMessages = (user, data) =>
    data.filter((item) => item.from === user).length

  return (
    <div>
      <Container position="left">
        {items.map((item, index) => {
          const count = countMessages(item[property], notifications)

          return (
            <ChatBarMenuItem
              key={item?._id || index}
              onClick={() => handleItemClick(item)}
              isSelected={selectedItem === item[property]}
              theme={theme}
            >
              <div class="user-info-container">
                {
                  <Avatar
                    item={item}
                    hasStatus={hasStatus}
                    property={property}
                  />
                }
                <div class="user-message-preview">
                  <span class="user-name">
                    {capitalizeFirstLetter(item[property])}
                  </span>
                  <span class="message-snippet">
                    Today is I'm very happy cos...
                  </span>
                </div>
              </div>
              <div class="message-info-container">
                <span class="message-date"> {monthDayFormat(new Date())}</span>
                {!!count && <span class="unread-message-count">{count}</span>}
              </div>
            </ChatBarMenuItem>
          )
        })}
      </Container>
    </div>
  )
}

export default List
