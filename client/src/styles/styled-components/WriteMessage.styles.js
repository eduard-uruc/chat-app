import styled from "styled-components"

export const WriteMessage = styled.input`
  width: 80%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.theme === "light" ? "var(--white1)" : "var(--gray2)")};
  outline: none;
  padding: 15px;
  background-color: ${(props) =>
    props.theme === "light"
      ? "var(--background-color-light1)"
      : "var(--background-color-dark2)"};
  color: ${(props) =>
    props.theme === "light"
      ? "var(--background-color-dark2)"
      : "var(--white1)"};
`
