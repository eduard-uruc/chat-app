import React, { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()

export const useSocket = () => useContext(SocketContext)

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '')

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
        });

        setSocket(newSocket)

        return () => newSocket.close()
    }, [userName])

    return (
        <SocketContext.Provider value={{ socket, setUserName }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider