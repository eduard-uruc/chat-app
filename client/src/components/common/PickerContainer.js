import React, { memo } from "react"
import Picker from "emoji-picker-react"

const PickerContainer = memo((props) => {
  return <Picker {...props} />
})

export default PickerContainer
