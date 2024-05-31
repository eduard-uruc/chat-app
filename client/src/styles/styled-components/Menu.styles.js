import styled from "styled-components"

export const Menu = styled.section`
  grid-area: menu;
  border-radius: 10px;

  background-color: ${(props) =>
    props.theme === "light"
      ? "var(--background-color-light1)"
      : "var(--background-color-dark2)"};
`
