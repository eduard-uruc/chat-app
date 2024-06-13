import React from "react"
import Avatar from "@mui/material/Avatar"
import Badge from "@mui/material/Badge"
import { styled } from "@mui/material/styles"
import { getRandomColor } from "../../../utils/colorUtils"

const user1 = "/assets/avatar/user1.jpg"
const user2 = "/assets/avatar/user2.jpg"

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))

export default function AvatarWithStatus({
  alt,
  src,
  size = 40,
  styles,
  isOnline = false,
}) {
  const avatarSrc =
    src || (isOnline ? user1 : alt === "incognito" ? user2 : " ")
  const backgroundColor = getRandomColor(alt)

  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
      invisible={!isOnline}
      sx={{ ...styles }}
    >
      <Avatar
        alt={alt}
        src={avatarSrc}
        sx={{
          width: size,
          height: size,
          bgcolor: backgroundColor,
          fontSize: size / 2.5,
        }}
      />
    </StyledBadge>
  )
}
