import styled from "styled-components"
import { LIGHT_THEME } from "../../../constants/theme"

export const StyledMessageChat = styled.div`
  margin-bottom: 10px;
`

export const StyledMessageContent = styled.div`
  background-color: ${(props) =>
    props.theme === LIGHT_THEME
      ? "var(--white1)"
      : "var(--background-color-dark1)"};
  color: ${(props) =>
    props.theme === LIGHT_THEME ? "var(--gray2)" : "var(--white2)"};
  padding: 8px 18px;
  border-radius: ${(props) =>
    props.auto ? "20px 0 20px 20px" : "0 20px 20px 20px"};
  position: relative;
  max-width: 300px;
  width: fit-content;
  margin-left: ${(props) => (props.auto ? "auto" : "unset")};
  font-size: 13px;
  word-wrap: break-word;
  overflow: hidden;
  white-space: pre-wrap;
`

export const StyledMessageText = styled.p`
  margin: 0;
`

export const StyledMessageTimestamp = styled.p`
  display: block;
  font-size: 0.75em;
  color: #888;
  margin-top: 5px;
`
