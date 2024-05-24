import React, { useState, useEffect } from 'react'
import { getUsers } from '../../services/api'
import List from '../common/List'
import { useSocket } from '../../SocketContext'

const filteredUser = (data) => data.filter(item => item.userName !== localStorage.getItem('userName'))

const UserList = ({ handleRecipient }) => {
    const { socket } = useSocket()
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const usersData = await getUsers()
        setUsers(filteredUser(usersData))
    }

    useEffect(() => {
        if (socket) {
            socket.on('newUserResponse', (data) => {
                setUsers(filteredUser(data))
            })

            return () => socket.off('newUserResponse')
        }
    }, [socket])

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <List
            items={users}
            property="userName"
            handleClick={handleRecipient}
            hasStatus={true}
        />
    )
}

export default UserList