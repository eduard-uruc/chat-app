import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import Tooltip from "@mui/material/Tooltip"
import Divider from "@mui/material/Divider"
import {
  StyledMenu,
  StyledMenuItem,
} from "../../styles/styled-components/chat-bar/MuiMenu.styles"
import StyledAvatar from "../../styles/styled-components/common/StyledAvatar.styles"
import getSettings from "../../utils/settingsConfig"
import { OPEN_SETTINGS } from "../../constants/settings"

const Settings = ({ user, toggleTheme, logout, theme }) => {
  const [anchorElUser, setAnchorElUser] = useState(null)
  const settings = getSettings(theme, toggleTheme, logout)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <div className="settings">
      <Tooltip title={OPEN_SETTINGS}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.fullName} src=" " />
        </IconButton>
      </Tooltip>
      <StyledMenu
        id="menu-appbar"
        theme={theme}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <StyledMenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center" className="menu-item-text">
            <StyledAvatar
              alt={user.fullName}
              src=" "
              styles={{ marginRight: 2 }}
              size={30}
            />
            {user.fullName}
          </Typography>
        </StyledMenuItem>

        <Divider />

        {settings.map((setting, index) => (
          <StyledMenuItem
            key={index}
            disabled={!setting.action}
            onClick={handleCloseUserMenu}
          >
            <Typography
              textAlign="center"
              onClick={setting.action}
              className="menu-item-text"
            >
              <span className="item-settings">
                {" "}
                <setting.icon className="icon-settings" /> {setting.name}
              </span>
            </Typography>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  )
}
export default Settings
