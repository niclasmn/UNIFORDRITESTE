// Shared TanStack Start / React / Tailwind configuration for this application.
// This repository is deployed to Google Cloud Run, so Nitro must emit a Node.js
// server instead of its Cloudflare Worker default.
// Nitro's node-server runtime listens on process.env.PORT (provided by Cloud Run).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "node-server",
  },
  tanstackStart: {
    // Keep the custom SSR error wrapper in src/server.ts.
    server: { entry: "server" },
  },
});
