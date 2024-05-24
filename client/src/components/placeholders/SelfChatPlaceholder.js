import React from 'react'
import { ReactComponent as MyIcon } from '../../assets/chatIcon.svg';
import { Container } from '../../styles/Container.styles'

const ChatPlaceholder = () => {
    return (
        <Container font={15} style={{ marginTop: '100px' }}>
            {/* <MyIcon width={200} /> */}
            <b>This is your space</b>
            <p>This chat is just for you...with you. Use it for drafts.</p>
        </Container>
    )
}

export default ChatPlaceholder