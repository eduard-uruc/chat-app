import styled from "styled-components"

export const Footer = styled.section`
  grid-area: footer;
  background-color: ${(props) =>
    props.theme === "light"
      ? "var(--background-color-light1)"
      : "var(--background-color-dark2)"};
  border-radius: 10px;

  color: var(--text-color);
`
