import styled from "styled-components"

export const StyledButtonContainer = styled.button`
  color: ${(props) => (props.color ? `var(--${props.color})` : "var(--blue1)")};
  font-size: 22px;
  margin: 10px 3px 0 0;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;

  &:hover {
    background-color: transparent;
  }
`

export const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
`

export const StyledFileInput = styled.input`
  display: none;
`

export const StyledFileInputLabel = styled.label`
  color: ${(props) => (props.color ? props.color : "var(--blue1)")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin: 4px 3px 20px 5px;
`

export const StyledInputMessageContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: ${(props) => (props.marginTop ? `${props.marginTop}px` : "0")};
`

export const FilePreviewContainer = styled.div`
  position: absolute;
  top: -65px;
  left: 10px;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
`
