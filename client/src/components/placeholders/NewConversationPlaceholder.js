import React from 'react';
import conversationImage from '../../assets/conversation.png';
import { Container } from '../../styles/Container.styles';

const ChatPlaceholder = () => {
    return (
        <Container font={15}>
            {/* <img src={conversationImage} alt="Conversation" width={200} /> */}
            <b>You're starting a new conversation</b>
            <p>Type your first message below.</p>
        </Container>
    );
};

export default ChatPlaceholder;
