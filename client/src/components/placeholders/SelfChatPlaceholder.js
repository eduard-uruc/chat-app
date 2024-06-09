import React from "react"
import { ReactComponent as MyIcon } from "../../assets/chatIcon.svg"
import { StyledContainer } from "../../styles/StyledContainer.styles"

const ChatPlaceholder = () => {
  return (
    <StyledContainer font={15} style={{ marginTop: "100px" }}>
      {/* <MyIcon width={200} /> */}
      <b>This is your space</b>
      <p>This chat is just for you...with you. Use it for drafts.</p>
    </StyledContainer>
  )
}

export default ChatPlaceholder
