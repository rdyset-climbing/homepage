// @ts-check
import { defineConfig } from "astro/config";
import yaml from "@rollup/plugin-yaml";
import mdx from "@astrojs/mdx";

export default defineConfig({
  vite: {
    plugins: [yaml()],
  },
  site: "https://www.rdyset.com",
  base: "/my-repo",
  prefetch: true,
  integrations: [mdx()],
});
