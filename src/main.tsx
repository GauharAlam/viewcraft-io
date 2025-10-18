// src/main.tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { CommandProvider } from "./context/CommandContext"; // Import CommandProvider

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <CommandProvider> {/* Wrap App with the CommandProvider */}
      <App />
    </CommandProvider>
  </AuthProvider>
);