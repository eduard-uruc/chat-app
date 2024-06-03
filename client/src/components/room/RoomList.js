import React, { useEffect } from "react"
import { FaPlus } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"

import List from "../common/List"
import { Container } from "../../styles/styled-components/Container.styles"
import { SOCKET_EVENTS } from "../../constants/socketEvents"
import { name } from "../../constants/common"
import { useSocket } from "../../SocketContext"

import { setRoom } from "../../features/rooms/roomsSlice"
import {
  setSelectedUser,
  setSelectedRecipient,
} from "../../features/users/usersSlice"
import { fetchRooms, addRoom } from "../../features/rooms/roomsThunks"
import { getRooms } from "../../features/rooms/roomsSelectors"

const RoomList = () => {
  const dispatch = useDispatch()
  const rooms = useSelector(getRooms)
  const { socket, userName: currentUser } = useSocket()

  useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  const joinRoom = (room) => {
    if (room) {
      dispatch(setRoom(room))
      socket && socket.emit(SOCKET_EVENTS.JOIN_ROOM, { room, currentUser })
    }
  }
  const handleRoom = (val) => {
    dispatch(setSelectedRecipient(val))
    dispatch(setSelectedUser(null))
    joinRoom(val)
  }

  const handleAddRoom = () => {
    const roomName = prompt("Type a room name")

    if (roomName) {
      dispatch(addRoom({ roomName, currentUser }))
    }
  }

  return (
    <>
      <Container
        font={18}
        direction="row"
        justify="space-around"
        className="create-room-container"
        onClick={handleAddRoom}
      >
        Create new room <FaPlus />
      </Container>

      <List items={rooms} property={name} handleRecipient={handleRoom} />
    </>
  )
}

export default RoomList
