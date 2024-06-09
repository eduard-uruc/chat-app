import styled from "styled-components"
import { LIGHT_THEME } from "../../../constants/theme"

export const StyledHeader = styled.header`
  grid-area: header;
  background-color: ${(props) =>
    props.theme === LIGHT_THEME
      ? "var(--background-color-light1)"
      : "var(--background-color-dark2)"};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  color: var(--text-color);
  overflow-y: auto;
  padding: 1em 0;
  box-shadow: 0 4px 8px var(--shadow-color1);
`

export const StyledHeaderTitle = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-weight: 700;
  color: ${(props) =>
    props.theme === LIGHT_THEME ? "var(--gray1)" : "var(--white1)"};
`
