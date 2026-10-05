# johnsbros

Website for [johnsbros.com](https://johnsbros.com): plain HTML pages styled with Tailwind CSS, built by Vite, and served as static assets by the `johnsbros` Cloudflare Worker.

```
index.html               Home
team/index.html          The Team
design-build/index.html  Design | Build
commercial/index.html    Commercial
residential/index.html   Residential
404.html                 Not found page
partials/                Shared head, header, footer and arrow, pulled in with <!-- @include name -->
src/                     Tailwind theme (main.css) and nav/contact-form script (main.js)
public/                  Files copied as-is (favicon)
```

- `npm run dev` runs the Vite dev server.
- `npm run build` writes the site to `dist/`.
- `npm run preview` builds and serves `dist/` through the Worker locally.
- Pushing to `main` deploys automatically (Cloudflare Workers Builds). `npm run deploy` builds and deploys by hand.

Contact forms open a pre-filled email to info@johnsbros.com; there is no form backend.
