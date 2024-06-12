import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import PreviewFile from "./PreviewFile"
import { renderFileDisplay } from "../../utils/fileDisplayUtils"

const FileDisplay = ({ file, className }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton color="primary" component="span" onClick={handleClickOpen}>
        {renderFileDisplay(file, handleClickOpen, className)}
      </IconButton>
      <PreviewFile open={open} file={file} handleClose={handleClose} />
    </>
  )
}

export default FileDisplay
