import React from "react"
import { useSelector } from "react-redux"

import UserList from "../user/UserList"
import RoomList from "../room/RoomList"
import { users } from "../../constants/common"
import { SideBarContainer } from "../../styles/styled-components/SideBar.styles"

import ChatMenu from "../../components/chat/ChatMenu"

import { selected_menu } from "../../features/users/usersSelectors"

const ChatBar = () => {
  const menu = useSelector(selected_menu)

  return (
    <SideBarContainer>
      <div className="chat-bar-title">
        <span> Inbox </span>
        <span
          style={{
            background: "#ff3b3e",
            fontSize: "11px",
            padding: "3px",
            borderRadius: "5px",
          }}
        >
          3 New
        </span>
      </div>
      <div className="chat-bar-title">
        <ChatMenu />
      </div>
      <>{menu === users ? <UserList /> : <RoomList />}</>
    </SideBarContainer>
  )
}

export default ChatBar
