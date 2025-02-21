import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/assets/"),
      components: path.resolve(__dirname, "src/components/"),
      use: path.resolve(__dirname, "src/use/"),
      src: path.resolve(__dirname, "src/"),
      public: path.resolve(__dirname, "public/"),
    },
  },
});
