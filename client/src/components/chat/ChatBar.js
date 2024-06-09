import React from "react"
import { useSelector } from "react-redux"

import { StyledMenu } from "../../styles/styled-components/chat-bar/StyledMenu.styles"
import ChatMenu from "../../components/chat/ChatMenu"
import UserList from "../user/UserList"
import RoomList from "../room/RoomList"

import { getSelectedMenu } from "../../features/users/usersSelectors"
import { getNotifications } from "../../features/notifications/notificationsSelectors"
import { users } from "../../constants/common"
import { useTheme } from "../../context/ThemeContext"

const ChatBar = () => {
  const { theme } = useTheme()
  const menu = useSelector(getSelectedMenu)
  const notifications = useSelector(getNotifications)
  const count = notifications?.length

  return (
    <StyledMenu theme={theme}>
      {!!count && (
        <div className="chat-bar-title">
          <span> Inbox </span>
          <span className="chat-bar-notification">{count} New</span>
        </div>
      )}
      <div className="chat-bar-title">
        <ChatMenu />
      </div>
      <>{menu === users ? <UserList /> : <RoomList />}</>
    </StyledMenu>
  )
}

export default ChatBar
