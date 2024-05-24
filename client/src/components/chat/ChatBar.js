import React, { useState, useEffect } from 'react'

import UserList from '../user/UserList'
import RoomList from '../room/RoomList'
import { users } from '../../constants/common'
import { SideBarContainer } from '../../styles/SideBar.styles'
import { Header } from '../../styles/Common.styles'

const ChatBar = ({ setRecipient, setRoom, setSelectedUser, menu, joinRoom }) => {

    const handleRoom = (val) => {
        setRoom(val)
        setRecipient(val)
        setSelectedUser(null)
        joinRoom(val)
    }

    const handleRecipient = (val) => {
        setRoom(null)
        setRecipient(val)
        setSelectedUser(val)

        console.log( 'chat bar val', val)

    }

    return (
        <SideBarContainer>
            <Header>Chat</Header>
            <>
                {menu === users
                    ? <UserList handleRecipient={handleRecipient} />
                    : <RoomList handleRoom={handleRoom} />
                }
            </>
        </SideBarContainer>
    )
}

export default ChatBar