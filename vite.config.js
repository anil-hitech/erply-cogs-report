import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "report/cogs",
  base: "/erply-cogs-report/",
  server: { host: true },
});
