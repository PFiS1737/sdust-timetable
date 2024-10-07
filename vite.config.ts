import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import { getPathAlias } from "./src/utils/index.node"
import tsconfig from "./tsconfig.json"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: getPathAlias(tsconfig.compilerOptions, import.meta),
  },
})
