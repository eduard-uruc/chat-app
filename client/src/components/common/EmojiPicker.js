import React, { memo } from "react"
import Picker from "emoji-picker-react"

const EmojiPicker = memo((props) => {
  return <Picker {...props} />
})

export default EmojiPicker
