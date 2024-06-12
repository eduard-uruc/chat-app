import React from "react"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import {
  FILE_TYPE_PDF,
  FILE_TYPE_WORD_OPENXML,
} from "../../constants/fileTypes"

const FilePreview = ({ file, handleClose, open }) => {
  const fileUrl = file?.url
  const fileType = file?.type

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {fileType?.startsWith("image/") && (
            <div>
              <img src={fileUrl} alt="Preview" style={{ maxWidth: "100%" }} />
            </div>
          )}

          {fileType === FILE_TYPE_PDF && (
            <div>
              <embed
                src={fileUrl}
                type={FILE_TYPE_PDF}
                width="100%"
                height="600px"
              />
            </div>
          )}

          {fileType === FILE_TYPE_WORD_OPENXML && (
            <div>
              <p>
                Preview not available for Word documents. Please download the
                file.
              </p>
              <a href={fileUrl} download>
                Download Word File
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default FilePreview
