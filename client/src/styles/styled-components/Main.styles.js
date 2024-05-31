import styled from "styled-components"

export const Main = styled.section`
  grid-area: main;
  background-color: ${(props) =>
    props.theme === "light"
      ? "var(--background-color-light1)"
      : "var(--background-color-dark2)"};
  border-radius: 10px;

  color: var(--text-color);
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`
