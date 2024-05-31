import styled from "styled-components"

export const ProfileDefaultContainer = styled.div`
  position: relative;
  width: ${(props) => (props.size ? props.size : "40px")};
  height: ${(props) => (props.size ? props.size : "40px")};
  border-radius: 50%;
  background-color: var(--background-color-light1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray3);
  font-weight: bold;
  font-size: 12px;
  margin-right: 5px;
`
