import React from "react"
import { FaUsers, FaComments } from "react-icons/fa"

import MenuItem from "./MenuItem"
import { users, rooms } from "../../constants/common"
import { SideMenuContainer } from "../../styles/styled-components/SideMenu.styles"
import { useTheme } from "../../context/ThemeContext"

const ChatMenu = () => {
  const { theme } = useTheme()

  const data = [
    { title: users, icon: FaUsers },
    { title: rooms, icon: FaComments },
  ]

  return (
    <SideMenuContainer theme={theme}>
      {data.map((item, index) => {
        return (
          <MenuItem
            key={index}
            title={item.title}
            index={index}
            theme={theme}
          />
        )
      })}
    </SideMenuContainer>
  )
}

export default ChatMenu
