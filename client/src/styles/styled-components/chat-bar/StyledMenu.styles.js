import styled from "styled-components"
import { LIGHT_THEME } from "../../../constants/theme"

export const StyledMenu = styled.section`
  grid-area: menu;
  border-radius: 10px;
  background-color: ${(props) =>
    props.theme === LIGHT_THEME
      ? "var(--background-color-light1)"
      : "var(--background-color-dark2)"};
`
