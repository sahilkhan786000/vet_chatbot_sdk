import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],

  // 🔥 SDK BUILD CONFIG
  build:
    mode === "sdk"
      ? {
          lib: {
            entry: "src/sdk/embed.jsx", // SDK entry
            name: "VetChatbot",
            fileName: "chatbot",
            formats: ["iife"], // REQUIRED for <script>
          },
          outDir: "dist-sdk",
          emptyOutDir: true,
        }
      : undefined,
}));
