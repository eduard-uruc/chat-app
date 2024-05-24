import React from 'react'
import Message from '../common/Message'

const ChatHistory = ({ messages, typingStatus, lastMessageRef, currentUser, selectedUser }) => {
    // const headerMessage = currentUser === selectedUser ? 'Your space' : `Chat with ${selectedUser}`

    return (
        <div>
            {/* <h3>{headerMessage}</h3> */}
            <>
                {messages.map((message) =>
                    <Message
                        key={message.id}
                        message={message}
                        isSender={message.from === currentUser}
                    />
                )}

                <div ref={lastMessageRef} />

                <div className="message__status">
                    <p>{typingStatus}</p>
                </div>
            </>
        </div>
    );
};

export default ChatHistory