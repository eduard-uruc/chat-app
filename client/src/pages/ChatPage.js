import React, { useState, useEffect, useRef } from 'react'

import ChatBar from '../components/chat/ChatBar'
import ChatMenu from '../components/chat/ChatMenu'
import ChatBody from '../components/chat/ChatBody'
import ChatFooter from '../components/chat/ChatFooter'

import { fetchData } from '../services/fetchData'
import { users, rooms } from '../constants/common'
import { SOCKET_EVENTS } from '../constants/socketEvents'
import { API_ENDPOINTS } from '../constants/apiEndpoints'
import { useSocket } from '../SocketContext'

const ChatPage = () => {
    const { socket } = useSocket()
    const [messages, setMessages] = useState([])
    const [typingStatus, setTypingStatus] = useState('')
    const [recipient, setRecipient] = useState(null)
    const [room, setRoom] = useState(null)
    const currentUser = localStorage.getItem('userName')
    const [selectedUser, setSelectedUser] = useState(null)
    const [menu, setMenu] = useState(users)
    const lastMessageRef = useRef(null)

    const getChatHistory = async () => {
        const history = await fetchData(API_ENDPOINTS.CHAT_HISTORY, { user1: currentUser, user2: selectedUser })
        setMessages(history)
    }

    const getRoomHistory = async () => {
        const history = await fetchData(API_ENDPOINTS.ROOM_HISTORY, { room: room })
        setMessages(history)
    }

    useEffect(() => {
        if (currentUser && selectedUser) {
            getChatHistory()
        }
    }, [currentUser, selectedUser])

    useEffect(() => {
        if (room) {
            getRoomHistory();
        }
    }, [room])

    useEffect(() => {
        if (!socket) return

        const handlePrivateMessageResponse = (data) => {
            if (selectedUser === data?.from) {
                setMessages((prevMessages) => [...prevMessages, data])
            }
        }

        const handleRoomMessage = (data) => {
            setMessages((prevMessages) => [...prevMessages, data])
        }

        const handleTypingResponse = (data) => {
            setTypingStatus(data)
        }

        const handleNotifyMessage = (data) => {
            if (data.from !== currentUser) {
                alert(`New message from ${data.from}: ${data.message}`)
            }
        }


        socket.on('privateMessageNotification', (data) => {
            // setNotifications((prevNotifications) => [...prevNotifications, data]);
            // Here you can also trigger a toast notification or any other user feedback
            // alert(`New message from ${data.from}: ${data.message}`);
        });


        socket.on(SOCKET_EVENTS.PRIVATE_MESSAGE_RESPONSE, handlePrivateMessageResponse)
        socket.on(SOCKET_EVENTS.ROOM_MESSAGE, handleRoomMessage)
        socket.on(SOCKET_EVENTS.TYPING_RESPONSE, handleTypingResponse)
        socket.on(SOCKET_EVENTS.NOTIFY_MESSAGE, handleNotifyMessage)
        return () => {
            socket.off(SOCKET_EVENTS.PRIVATE_MESSAGE_RESPONSE, handlePrivateMessageResponse)
            socket.off(SOCKET_EVENTS.ROOM_MESSAGE, handleRoomMessage)
            socket.off(SOCKET_EVENTS.TYPING_RESPONSE, handleTypingResponse)
            socket.off(SOCKET_EVENTS.NOTIFY_MESSAGE, handleNotifyMessage)
        }
    }, [socket, recipient])

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const joinRoom = (room) => {
        if (room) {
            setRoom(room)
            socket && socket.emit('join room', room)
        }
    }

    const handleMenu = (e) => {
        setMenu(e)
        setRoom('')
        setSelectedUser('')
    }

    return (
        <div className="chat">
            <ChatMenu
                handleMenu={handleMenu}
                menu={menu}
            />
            <ChatBar
                setRecipient={setRecipient}
                setSelectedUser={setSelectedUser}
                setRoom={setRoom}
                menu={menu}
                joinRoom={joinRoom}
            />
            <div className="chat__main">
                <ChatBody
                    messages={messages}
                    typingStatus={typingStatus}
                    lastMessageRef={lastMessageRef}
                    recipient={recipient}
                    room={room}
                    currentUser={currentUser}
                    selectedUser={selectedUser}
                    menu={menu}
                />
                <ChatFooter
                    recipient={recipient}
                    messages={messages}
                    setMessages={setMessages}
                    room={room}
                />
            </div>
        </div>
    )
}

export default ChatPage