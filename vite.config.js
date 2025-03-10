import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    build: { chunkSizeWarningLimit: 2000 },
    clearScreen: false,
    css: {
        modules: {
            generateScopedName: "[local]_[hash:base64:8]",
        },
    },
    plugins: [react()],
});
