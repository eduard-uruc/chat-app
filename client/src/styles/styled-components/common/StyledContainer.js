import styled from "styled-components"

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "column")};
  align-items: ${({ position }) => (position ? position : "center")};
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  font-size: ${({ font }) => (font ? `${font}px` : "12px")};
  color: #607eaa;
  cursor: ${({ cursor }) => (cursor ? cursor : "default")};
`
