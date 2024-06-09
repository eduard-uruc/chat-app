import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { capitalizeFirstLetter } from "../../utils//stringUtils"
import { MenuItemContainer } from "../../styles/styled-components/chat-bar/SideMenu.styles"
import { getSelectedMenu } from "../../features/users/usersSelectors"
import { setMenu, setSelectedUser } from "../../features/users/usersSlice"
import { setRoom } from "../../features/rooms/roomsSlice"

const MenuItem = ({ title, index, theme }) => {
  const dispatch = useDispatch()
  const menu = useSelector(getSelectedMenu)

  const handleMenu = (e) => {
    dispatch(setMenu(e))
    dispatch(setRoom(""))
    dispatch(setSelectedUser(""))
  }

  return (
    <MenuItemContainer
      key={index}
      onClick={() => handleMenu(title)}
      isSelected={menu === title}
      theme={theme}
    >
      <p>{capitalizeFirstLetter(title)}</p>
    </MenuItemContainer>
  )
}

export default MenuItem
