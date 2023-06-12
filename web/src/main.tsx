import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.GOOGLE_ID || ""}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
