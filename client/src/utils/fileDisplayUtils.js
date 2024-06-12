import React from "react"
import Image from "../components/common/Image"
import { renderFileIcon } from "./fileTypeIconUtils"

export const renderFileDisplay = (file, handleClickOpen = null, className) => {
  if (!file || !file.type) return null

  return file.type.startsWith("image/") ? (
    <Image
      url={file.url || URL.createObjectURL(file)}
      onClick={handleClickOpen}
      className={`${className}-image-display`}
    />
  ) : (
    renderFileIcon(file.type, className)
  )
}
