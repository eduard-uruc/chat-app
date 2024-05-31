import styled from "styled-components"

export const MessageChat = styled.div`
  margin-bottom: 10px;
`

export const MessageContent = styled.div`
  background-color: var(--background-color-dark1);
  padding: 5px 15px;
  border-radius: ${(props) =>
    props.auto ? "10px 0 10px 10px" : "0 10px 10px 10px"};
  position: relative;
  max-width: 300px;
  width: fit-content;
  margin-left: ${(props) => (props.auto ? "auto" : "unset")};
  font-size: 13px;
  word-wrap: break-word;
  overflow: hidden;
  white-space: pre-wrap;
`

export const MessageText = styled.p`
  margin: 0;
`

export const MessageTimestamp = styled.p`
  display: block;
  font-size: 0.75em;
  color: #888;
  margin-top: 5px;
`
