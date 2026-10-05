import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const root = import.meta.dirname;
const pages = ["index", "team/index", "design-build/index", "commercial/index", "residential/index", "contact/index", "404"];

// Swaps `<!-- @include name -->` for partials/name.html so pages share one header and footer.
const includePartials = {
  name: "include-partials",
  // "pre" so Vite still sees the script tag that comes from partials/head.html.
  transformIndexHtml: {
    order: "pre",
    handler: (html) =>
      html.replace(/<!--\s*@include\s+([\w-]+)\s*-->/g, (_, name) =>
        readFileSync(resolve(root, "partials", `${name}.html`), "utf8"),
      ),
  },
};

export default defineConfig({
  plugins: [includePartials, tailwindcss()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p, resolve(root, `${p}.html`)])),
    },
  },
});
