import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getUsers } from "../../services/api"
import List from "../common/List"
import { useSocket } from "../../SocketContext"
import { SOCKET_EVENTS } from "../../constants/socketEvents"

import { setRoom } from "../../features/rooms/roomsSlice"
import {
  setSelectedRecipient,
  setSelectedUser,
} from "../../features/users/usersSlice"

import { current_user } from "../../features/users/usersSelectors"

const filteredUser = (data, currentUser) =>
  data.filter((item) => item.userName !== currentUser)

const UserList = () => {
  const dispatch = useDispatch()
  const { socket } = useSocket()
  const currentUser = useSelector(current_user)

  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const usersData = await getUsers()
    setUsers(filteredUser(usersData, currentUser))
  }

  useEffect(() => {
    if (socket) {
      socket.on(SOCKET_EVENTS.NEW_USER_RESPONSE, (data) => {
        setUsers(filteredUser(data, currentUser))
      })

      return () => socket.off(SOCKET_EVENTS.NEW_USER_RESPONSE)
    }
  }, [socket])

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleRecipient = (val) => {
    dispatch(setRoom(null))
    dispatch(setSelectedRecipient(val))
    dispatch(setSelectedUser(val))
  }

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
