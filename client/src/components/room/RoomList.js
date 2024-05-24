import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import List from '../common/List'
import { getRooms } from '../../services/api'
import { updateData } from '../../services/fetchData'
import { Container } from '../../styles/Container.styles'
import { API_ENDPOINTS } from '../../constants/apiEndpoints'

const RoomList = ({ handleRoom }) => {
    const [rooms, setRooms] = useState([])

    const fetchRooms = async () => {
        const rooms = await getRooms()
        setRooms(rooms)
    }

    useEffect(() => {
        fetchRooms()
    }, [])

    const addRoom = async () => {
        const roomName = prompt("Type a room name")

        if (roomName) {
            const roomData = { name: roomName, createdBy: localStorage.getItem('userName') };

            try {
                try {
                    const newRoom = await updateData(API_ENDPOINTS.NEW_ROOM, roomData);
                    setRooms((prevRooms) => [...prevRooms, newRoom]);
                } catch (error) {
                    console.error('Error:', error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    return (
        <>
            <Container
                font={18}
                direction='row'
                justify="space-around"
                style={{ marginBottom: '1em', fontWeight: 500 }}
                onClick={addRoom}
            >
                Create new room <FaPlus />
            </Container>

            <List
                items={rooms}
                property="name"
                handleClick={handleRoom}
            />
        </>

    )
}

export default RoomList