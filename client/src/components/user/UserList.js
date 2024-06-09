import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import List from "../common/List"
import { useSocket } from "../../context/SocketContext"
import { SOCKET_EVENTS } from "../../constants/socketEvents"
import { userName } from "../../constants/common"
import { filteredUser } from "../../utils/userUtils"

import { setRoom } from "../../features/rooms/roomsSlice"
import {
  setSelectedRecipient,
  setSelectedUser,
  setUsers,
} from "../../features/users/usersSlice"
import { fetchUsers } from "../../features/users/usersThunks"
import { getUsers } from "../../features/users/usersSelectors"

const UserList = () => {
  const dispatch = useDispatch()
  const { socket, userName: currentUser } = useSocket()
  const users = useSelector(getUsers)

  useEffect(() => {
    if (socket) {
      socket.on(SOCKET_EVENTS.NEW_USER_RESPONSE, (data) => {
        const filteredUsers = filteredUser(data, currentUser)
        dispatch(setUsers(filteredUsers))
      })

      return () => socket.off(SOCKET_EVENTS.NEW_USER_RESPONSE)
    }
  }, [socket, dispatch])

  useEffect(() => {
    const fetchAndFilterUsers = async () => {
      try {
        const result = await dispatch(fetchUsers()).unwrap()
        const filteredUsers = await filteredUser(result, currentUser)

        dispatch(setUsers(filteredUsers))
      } catch (err) {
        console.error("Failed to fetch users: ", err)
      }
    }

    fetchAndFilterUsers()
  }, [dispatch, currentUser])

  const handleRecipient = (val) => {
    dispatch(setRoom(null))
    dispatch(setSelectedRecipient(val))
    dispatch(setSelectedUser(val))
  }

  return (
    <List items={users} property={userName} handleRecipient={handleRecipient} />
  )
}

export default UserList
