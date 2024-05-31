import React from "react"
import ProfileDefault from "./ProfileDefault"
import user from "../../assets/download.jpg"

import { ProfileImgContainer } from "../../styles/styled-components/ProfileImgContainer.styles"

const Avatar = ({ img, item, hasStatus, property, size }) => {
  return (
    <div class="profile-picture-status">
      {item?.profile_picture ? (
        <ProfileImgContainer src={user} alt="Profile Picture" size="25px" />
      ) : (
        <ProfileDefault
          name={item[property]}
          isOnline={item.online}
          hasStatus={hasStatus}
          size={size}
        />
      )}
      {item.online && <span class="online-status"></span>}
    </div>
  )
}

export default Avatar
