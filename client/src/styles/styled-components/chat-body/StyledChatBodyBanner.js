import styled from "styled-components"
import { LIGHT_THEME } from "../../../constants/theme"

export const StyledChatBodyBanner = styled.section`
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 20px;
  margin-bottom: 1px;
  color: ${(props) =>
    props.theme === LIGHT_THEME ? "var(--gray2)" : "var(--blue1)"};
  box-shadow: 0 4px 8px var(--shadow-color1);
`
