import React from "react"
import { useSelector } from "react-redux"

import UserList from "../user/UserList"
import RoomList from "../room/RoomList"
import { users } from "../../constants/common"
import { SideBarContainer } from "../../styles/styled-components/SideBar.styles"

import ChatMenu from "../../components/chat/ChatMenu"

import { selected_menu } from "../../features/users/usersSelectors"
import { getNotifications } from "../../features/notifications/notificationsSelectors"

const ChatBar = () => {
  const menu = useSelector(selected_menu)
  const notifications = useSelector(getNotifications)
  const count = notifications?.length

  return (
    <SideBarContainer>
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
    </SideBarContainer>
  )
}

export default ChatBar
