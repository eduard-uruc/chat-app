import styled from "styled-components"

export const ProfileImgContainer = styled.img`
  position: relative;
  width: ${(props) => (props.size ? props.size : "40px")};
  height: ${(props) => (props.size ? props.size : "40px")};
  border-radius: 50%;
  margin-right: 5px;
`
