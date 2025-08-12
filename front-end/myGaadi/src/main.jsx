import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import { ShortlistProvider } from "./contexts/ShortlistContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShortlistProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ShortlistProvider>
  </BrowserRouter>
);
