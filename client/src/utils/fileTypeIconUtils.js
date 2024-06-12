import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import DescriptionIcon from "@mui/icons-material/Description"
import {
  FILE_TYPE_PDF,
  FILE_TYPE_WORD,
  FILE_TYPE_WORD_OPENXML,
} from "../constants/fileTypes"

export const renderFileIcon = (fileType, className) => {
  switch (fileType) {
    case FILE_TYPE_PDF:
      return <PictureAsPdfIcon className={`${className}-pdf-display`} />
    case FILE_TYPE_WORD:
    case FILE_TYPE_WORD_OPENXML:
      return <DescriptionIcon className={`${className}-word-display`} />
    default:
      return (
        <InsertDriveFileIcon className={`${className}-other-file-display`} />
      )
  }
}
