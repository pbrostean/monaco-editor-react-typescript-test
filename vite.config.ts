import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import importMetaUrlPlugin from "@codingame/esbuild-import-meta-url-plugin";
import vsixPlugin from '@codingame/monaco-vscode-rollup-vsix-plugin';

export default defineConfig({
  plugins: [vsixPlugin(), react()],
  worker: {
    format: "es",
  },
  optimizeDeps: {
    include: ["vscode-textmate", "vscode-oniguruma"],
    esbuildOptions: {
      plugins: [importMetaUrlPlugin]
    }
  },
});
