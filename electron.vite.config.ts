import { resolve } from "node:path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import tsconfigPathsPlugins from "vite-tsconfig-paths";
import tailwindcss from "tailwindcss";

const tsconfigPaths = tsconfigPathsPlugins({
  projects: [resolve("tsconfig.json")],
});

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), tsconfigPaths],
    publicDir: resolve("resources"),
  },
  preload: {
    plugins: [externalizeDepsPlugin(), tsconfigPaths],
  },
  renderer: {
    define: {
      "process.platform": JSON.stringify(process.platform),
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: "./src/renderer/tailwind.config.js",
          }),
        ],
      },
    },
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
      },
    },
    plugins: [react(), tsconfigPaths],
  },
});
