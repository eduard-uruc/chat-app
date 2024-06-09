import React from "react"

import MenuItem from "./MenuItem"
import { users, rooms } from "../../constants/common"
import { SideMenuContainer } from "../../styles/styled-components/chat-bar/SideMenu.styles"
import { useTheme } from "../../context/ThemeContext"

const ChatMenu = () => {
  const { theme } = useTheme()
  const menuItems = [users, rooms]

  return (
    <SideMenuContainer theme={theme}>
      {menuItems.map((item, index) => {
        return <MenuItem key={index} title={item} index={index} theme={theme} />
      })}
    </SideMenuContainer>
  )
}

export default ChatMenu
