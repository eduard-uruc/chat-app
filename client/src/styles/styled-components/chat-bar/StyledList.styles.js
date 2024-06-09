import styled from "styled-components"
import { LIGHT_THEME } from "../../../constants/theme"

export const StyledListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: ${({ isSelected }) =>
    isSelected ? "20px 0 20px 20px" : "8px 0 8px 8px"};
  box-shadow: 0 4px 8px var(--shadow-color1);
  margin: 1em 1em;
  background-color: ${({ isSelected, theme }) =>
    isSelected
      ? theme === LIGHT_THEME
        ? "var(--white2)"
        : "var(--background-color-dark1)"
      : theme === LIGHT_THEME
      ? "var(--white1)"
      : "var(--background-color-dark2)"};

  ${(props) => props.isSelected && `position: relative; left: 8px; `}

  &:hover {
    background-color: ${({ theme }) =>
      theme === LIGHT_THEME
        ? "var(--white2)"
        : "var(--background-color-dark1)"};
    position: relative;
    left: 8px;
    border-radius: 20px 0 20px 20px;
  }
`

export const StyledMessageDate = styled.div`
  margin-bottom: 10px;
  color: ${(props) =>
    props.theme === LIGHT_THEME ? "var(--gray1)" : "var(--white1)"};
`

export const StyledMessageSnipet = styled.div`
  font-size: 11px;
  color: ${(props) =>
    props.theme === LIGHT_THEME ? "var(--gray1)" : "var(--white2)"};
`
export const StyledUsername = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 13px;
  color: ${(props) =>
    props.theme === LIGHT_THEME ? "var(--gray1)" : "var(--white1)"};
`
