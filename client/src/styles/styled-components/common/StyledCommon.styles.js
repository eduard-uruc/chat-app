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
    background-color: none;
  }
`

export const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
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
  margin: 4px 3px 0 5px;
`
