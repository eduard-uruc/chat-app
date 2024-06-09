import styled from "styled-components"
import { LIGHT_THEME } from "../../../constants/theme"

export const StyledFooter = styled.section`
  grid-area: footer;
  background-color: ${(props) =>
    props.theme === LIGHT_THEME
      ? "var(--background-color-light1)"
      : "var(--background-color-dark2)"};
  border-radius: 10px;

  color: var(--text-color);
`
