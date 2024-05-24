import React from 'react'
import { FaUsers, FaComments, FaHome } from 'react-icons/fa'

import MenuItem from './MenuItem'
import { users, rooms } from '../../constants/common'
import { SideMenuContainer } from '../../styles/SideMenu.styles'

const ChatMenu = ({ handleMenu, menu }) => {
    const data = [{ title: users, icon: FaUsers }, { title: rooms, icon: FaComments }]

    return (
        <SideMenuContainer>
            {data.map((item, index) => {
                return (
                    <MenuItem
                        key={index}
                        title={item.title}
                        handleMenu={handleMenu}
                        IconComponent={item.icon}
                        index={index}
                        selectedItem={menu}
                    />
                )
            })}
        </SideMenuContainer>
    )
}

export default ChatMenu