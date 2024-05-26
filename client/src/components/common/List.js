import React, { useState } from "react"

import ListItem from "../common/ListItem"
import Status from "../common/Status"

import { twelveHourFormat } from "../../utils/timeFormatUtils"
import { Container } from "../../styles/Container.styles"
import { ListItemContainer } from "../../styles/List.styles"
import { Notification } from "../../styles/Notification.styles"
import { useSocket } from "../../SocketContext"

const List = ({ items, handleClick, property, hasStatus = false }) => {
  const { notifications, setCurrentRecipient } = useSocket()
  const [selectedItem, setSelectedItem] = useState(null)

  const handleItemClick = (item) => {
    setSelectedItem(item[property])
    handleClick(item[property])
    setCurrentRecipient(item[property])
  }

  const countMessages = (user, data) =>
    data.filter((item) => item.from === user).length

  return (
    <div>
      <Container position="left">
        {items.map((item, index) => {
          const count = countMessages(item[property], notifications)

          return (
            <ListItemContainer
              key={item?._id || index}
              onClick={() => handleItemClick(item)}
              isSelected={selectedItem === item[property]}
            >
              <Container position="left" direction="row">
                <Status
                  name={item[property]}
                  isOnline={item.online}
                  hasStatus={hasStatus}
                />
                <ListItem item={item} property={property} />
                {/* {twelveHourFormat(new Date())} */}
              </Container>
              {!!count && (
                <Container>
                  <Notification>{count}</Notification>
                </Container>
              )}
            </ListItemContainer>
          )
        })}
      </Container>
    </div>
  )
}

export default List
