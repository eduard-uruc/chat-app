import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { capitalizeFirstLetter } from "../../utils//stringUtils"
import { MenuItemContainer } from "../../styles/SideMenu.styles"
import { selected_menu } from "../../features/users/usersSelectors"
import { setMenu, setSelectedUser } from "../../features/users/usersSlice"
import { setRoom } from "../../features/rooms/roomsSlice"

const MenuItem = ({ title, IconComponent, index }) => {
  const dispatch = useDispatch()
  const menu = useSelector(selected_menu)

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
    >
      <IconComponent style={{ width: "30px", height: "30px" }} />
      <p>{capitalizeFirstLetter(title)}</p>
    </MenuItemContainer>
  )
}

export default MenuItem
