import styled from "styled-components"

export const SideMenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  margin: 0 2px 10px 0;
  color: #607eaa;
  background: ${({ theme }) =>
    theme === "light" ? "var(--white2)" : "var(--background-color-dark3)"};
  border-radius: 8px;

  img {
    margin-top: 10px;
  }

  span {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
  }
`

export const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ isSelected, theme }) =>
    isSelected
      ? theme === "light"
        ? "var(--white1)"
        : "var(--background-color-dark1)"
      : theme === "light"
      ? "var(--white2)"
      : "var(--background-color-dark2)"};

  cursor: pointer;
  width: 70px;
  padding: 0.5em 4em;
  margin: 5px;
  border-radius: 5px;

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light" ? "var(--white1)" : "var(--background-color-dark1)"};
  }
`
