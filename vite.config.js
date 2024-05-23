import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    //env variable from .env file
    "process.env.VITE_USER_API_URL": JSON.stringify(
      process.env.VITE_USER_API_URL
    ),
    "process.env.VITE_USERDATA_API_URL": JSON.stringify(
      process.env.VITE_USERDATA_API_URL
    ),
  },
});
