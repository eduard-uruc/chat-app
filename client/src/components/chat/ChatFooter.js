import React, { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { ButtonContainer, Form } from '../../styles/Common.styles'
import { useSocket } from '../../SocketContext'

const ChatFooter = ({ recipient, messages, setMessages, room }) => {
    const { socket } = useSocket()
    const [message, setMessage] = useState('')

    // console.log('recipient: ',recipient)

    const handleTyping = (message) => {
        if (socket) {
            socket.emit('typing', {
                message,
                recipient: room ? room : recipient   // .socketID
            })
        }
    }

    const sendMessage = (to, event) => {
        if (socket) {
            const newMessage = {
                message,
                from: localStorage.getItem('userName'),
                to,
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
                room
            }

            socket.emit(event, newMessage)

            setMessages(prev => [...prev, newMessage])
            setMessage('')
        }
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (message.trim() && localStorage.getItem('userName')) {
            console.log('Send data..')
            !room ? sendMessage(recipient, 'privateMessage') : sendMessage(room, 'room message')
        }
    };

    return (
        <div className="chat__footer">
            <Form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={() => handleTyping(`${localStorage.getItem('userName')} is typing`)}
                    onKeyUp={() => handleTyping('')}
                />
                <ButtonContainer type="submit">
                    <FaPaperPlane />
                </ButtonContainer>
            </Form>
        </div>
    )
}

export default ChatFooter