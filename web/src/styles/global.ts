import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

body {
  background-color: ${(props) => props.theme.colors["background"]};
  color: ${(props) => props.theme.colors["gray-700"]};
  -webkit-font-smoothing: antialised;
}

body, input-security, textarea, button {
  font-family: ${({ theme }) => theme.fonts.regular};
  font-weight: 400;
  font-size: ${({ theme }) => theme.textSizes["text-regular-m"]}
}

button {
  cursor: pointer;
  }

input[type="number"] {
  -moz-appearance: textfield;
}

::-webkit-scrollbar {
    width: 0.8rem;
  }
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors["yellow-500"]};
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 2rem;
    background: ${(props) => props.theme.colors["yellow-300"]};
  }
`;
