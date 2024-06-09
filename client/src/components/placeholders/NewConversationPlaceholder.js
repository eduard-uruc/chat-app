import React from "react"
import conversationImage from "../../assets/conversation.png"
import { StyledContainer } from "../../styles/styled-components/common/StyledContainer"

const ChatPlaceholder = () => {
  return (
    <StyledContainer font={15}>
      {/* <img src={conversationImage} alt="Conversation" width={200} /> */}
      <b>You're starting a new conversation</b>
      <p>Type your first message below.</p>
    </StyledContainer>
  )
}

export default ChatPlaceholder
