import React, { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"

import List from "../common/List"
import { getRooms } from "../../services/api"
import { Container } from "../../styles/styled-components/Container.styles"
import { SOCKET_EVENTS } from "../../constants/socketEvents"
import { useSocket } from "../../SocketContext"

import { setRoom } from "../../features/rooms/roomsSlice"
import {
  setSelectedUser,
  setSelectedRecipient,
} from "../../features/users/usersSlice"
import { addRoom } from "../../features/rooms/roomsThunks"
import { current_user } from "../../features/users/usersSelectors"

const RoomList = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(current_user)
  const { socket } = useSocket()
  const [rooms, setRooms] = useState([])

  const fetchRooms = async () => {
    const rooms = await getRooms()
    setRooms(rooms)
  }

  useEffect(() => {
    fetchRooms()
  }, [])

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
        .then((res) => {
          setRooms([...rooms, res.payload])
        })
        .catch((error) => {
          console.error("Error adding room:", error)
        })
    }
  }

  return (
    <>
      <Container
        font={18}
        direction="row"
        justify="space-around"
        style={{ marginBottom: "1em", fontWeight: 500 }}
        onClick={handleAddRoom}
      >
        Create new room <FaPlus />
      </Container>

      <List items={rooms} property="name" handleClick={handleRoom} />
    </>
  )
}

export default RoomList
