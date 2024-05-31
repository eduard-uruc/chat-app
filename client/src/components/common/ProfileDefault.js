import React from "react"

import { getAcronym } from "../../utils/stringUtils"
import { ProfileDefaultContainer } from "../../styles/styled-components/ProfileDefaultContainer.styles"

const ProfileDefault = ({ name, size }) => (
  <ProfileDefaultContainer size={size}>
    {getAcronym(name)}
  </ProfileDefaultContainer>
)

export default ProfileDefault
