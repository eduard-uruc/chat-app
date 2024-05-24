import { property } from 'lodash'
import React, { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()

export const useSocket = () => useContext(SocketContext)

const filterData = (val, arr, setter, property) => {
    const newItems = arr.filter(item => item[property] !== val)
    setter(newItems)
}

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '')
    const [notifications, setNotifications] = useState([])
    const [currentRecipient, setCurrentRecipient] = useState('')

    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_SOCKET_SERVER_URL || 'http://localhost:4000')

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id)
            if (userName) {
                newSocket.emit('identify', userName)
            }
        })

        newSocket.on('reconnect', () => {
            console.log('Socket reconnected:', newSocket.id)
            if (userName) {
                newSocket.emit('identify', userName)
            }
        })

        newSocket.on('privateMessageNotification', (data) => {
            if (data.from !== currentRecipient) {
                setNotifications((prevNotifications) => [...prevNotifications, data])
            }
        })

        setSocket(newSocket)

        /**
         * clear notification
         * to be removed in the future
         */
        filterData(currentRecipient, notifications, setNotifications, 'from')


        return () => newSocket.close()
    }, [userName, currentRecipient])

    const clearNotifications = () => {
        setNotifications([])
    }

    return (
        <SocketContext.Provider value={{ socket, setUserName, notifications, clearNotifications, setCurrentRecipient }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider