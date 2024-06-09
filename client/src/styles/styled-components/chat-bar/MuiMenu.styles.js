import { styled } from "@mui/material/styles"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { LIGHT_THEME } from "../../../constants/theme"

export const StyledMenu = styled(Menu)(({ theme }) => ({
  marginTop: "45px",

  "& .MuiPaper-root": {
    backgroundColor:
      theme === LIGHT_THEME
        ? "var(--background-color-light1)"
        : "var(--background-color-dark2)",
    color: theme === LIGHT_THEME ? "var(--black)" : "var(--blue1)",
  },
}))

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "& .icon-settings": {
    marginRight: theme.spacing(1),
    fontSize: "20px",
  },
  "& .menu-item-text": {
    fontSize: "16px",
  },
}))
