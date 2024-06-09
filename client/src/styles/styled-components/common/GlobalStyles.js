import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    font-family: Arial, sans-serif;
    transition: background-color 0.3s, color 0.3s;
  }

  #messages {
    list-style-type: none;
    padding: 0;
  }

  #messages li {
    padding: 8px;
    margin-bottom: 10px;
    border-radius: 4px;
  }

  #form {
    display: flex;
    flex-direction: column;
  }

  #input, #recipient {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: ${(props) => props.theme.inputBackground};
    color: ${(props) => props.theme.inputText};
  }

  button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: ${(props) => props.theme.buttonBackground};
    color: ${(props) => props.theme.buttonText};
    cursor: pointer;
  }

  button:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`
