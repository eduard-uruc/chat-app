import React from "react"
import { FaUsers, FaComments, FaHome } from "react-icons/fa"

import MenuItem from "./MenuItem"
import { users, rooms } from "../../constants/common"
import { SideMenuContainer } from "../../styles/SideMenu.styles"

const ChatMenu = () => {
  const data = [
    { title: users, icon: FaUsers },
    { title: rooms, icon: FaComments },
  ]

  return (
    <SideMenuContainer>
      {data.map((item, index) => {
        return (
          <MenuItem
            key={index}
            title={item.title}
            IconComponent={item.icon}
            index={index}
          />
        )
      })}
    </SideMenuContainer>
  )
}

export default ChatMenu
