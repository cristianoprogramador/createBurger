import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "./contexts/Context";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <ContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ContextProvider>
      <ToastContainer position="top-center" />
    </ThemeProvider>
  );
}
