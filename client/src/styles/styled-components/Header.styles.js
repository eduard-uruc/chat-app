import styled from "styled-components"

export const Header = styled.header`
  grid-area: header;
  background-color: ${(props) =>
    props.theme === "light"
      ? "var(--background-color-light1)"
      : "var(--background-color-dark2)"};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;

  color: var(--text-color);
  overflow-y: auto;
`
