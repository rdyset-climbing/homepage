// @ts-check
import { defineConfig } from "astro/config";
import yaml from "@rollup/plugin-yaml";
import mdx from "@astrojs/mdx";

export default defineConfig({
  vite: {
    plugins: [yaml()],
  },
  site: "https://rdyset.com",
  prefetch: true,
  integrations: [mdx()],
});
