import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'

import ChatHistory from './ChatHistory'
import NewConversationPlaceholder from '../placeholders/NewConversationPlaceholder'
import { BodyHeader } from '../../styles/BodyHeader'

const ChatBody = ({ messages, typingStatus, lastMessageRef, recipient, room, currentUser, selectedUser, menu }) => {
    const navigate = useNavigate();
    const headerMessage = recipient && `Chat with ${recipient}`

    const handleLeaveChat = () => {
        localStorage.removeItem('userName')
        navigate('/')
        window.location.reload()
    };

    return (
        <>
            <BodyHeader>
                {headerMessage}
                <>
                    <p style={{ marginRight: '1em', fontSize: '13px' }}>{currentUser}</p>
                    <FaSignOutAlt onClick={handleLeaveChat} />
                </>
            </BodyHeader>
            <div className="message__container">
                {!recipient
                    ? <p>Pick someone and start chatting</p>
                    : !!messages.length
                        ? <ChatHistory
                            messages={messages}
                            typingStatus={typingStatus}
                            lastMessageRef={lastMessageRef}
                            currentUser={currentUser}
                            selectedUser={selectedUser}
                        />
                        : <NewConversationPlaceholder />
                }
            </div>
        </>
    );
};

export default ChatBody;