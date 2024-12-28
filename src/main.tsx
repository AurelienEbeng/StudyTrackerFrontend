import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import JwtProvider from "./context/Jwt.context.tsx";

createRoot(document.getElementById("root")!).render(
  <JwtProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </JwtProvider>
);
