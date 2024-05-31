import styled from "styled-components"

export const ChatBarMenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 8px 0 8px 8px;
  box-shadow: 0 4px 8px var(--shadow-color1);
  margin: 1em 1em;
  background-color: ${({ isSelected, theme }) =>
    isSelected
      ? theme === "light"
        ? "var(--white2)"
        : "var(--background-color-dark1)"
      : theme === "light"
      ? "var(--white1)"
      : "var(--background-color-dark2)"};

  ${(props) => props.isSelected && `position: relative; left: 22px; `}

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light" ? "var(--white2)" : "var(--background-color-dark1)"};
    position: relative;
    left: 22px;
  }
`

export const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isOnline }) => (isOnline ? "green" : "red")};
  margin-left: 10px;
`
