import React from "react"
import { useSelector } from "react-redux"

import UserList from "../user/UserList"
import RoomList from "../room/RoomList"
import { users } from "../../constants/common"
import { SideBarContainer } from "../../styles/SideBar.styles"
import { Header } from "../../styles/Common.styles"

import { selected_menu } from "../../features/users/usersSelectors"

const ChatBar = () => {
  const menu = useSelector(selected_menu)

  return (
    <SideBarContainer>
      <Header>Chat</Header>
      <>{menu === users ? <UserList /> : <RoomList />}</>
    </SideBarContainer>
  )
}

export default ChatBar
