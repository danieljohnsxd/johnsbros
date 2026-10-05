# johnsbros

Website for [johnsbros.com](https://johnsbros.com): plain HTML pages styled with Tailwind CSS, built by Vite, and served as static assets by the `johnsbros` Cloudflare Worker.

```
index.html               Home
team/index.html          The Team
design-build/index.html  Design | Build
commercial/index.html    Commercial
residential/index.html   Residential
contact/index.html       Contact form
404.html                 Not found page
partials/                Shared head, header, footer and arrow, pulled in with <!-- @include name -->
src/                     Tailwind theme (main.css), browser script (main.js) and the Worker (worker.js)
public/                  Files copied as-is (favicon, images/)
```

- `npm run dev` runs the Vite dev server.
- `npm run build` writes the site to `dist/`.
- `npm run preview` builds and serves `dist/` through the Worker locally.
- Pushing to `main` deploys automatically (Cloudflare Workers Builds). `npm run deploy` builds and deploys by hand.

The contact form posts to `/api/contact`; the Worker emails it to doby@johnsbros.com, CC bethany@johnsbros.com, through Cloudflare Email Sending (`EMAIL` binding), with Reply-To set to the visitor.

## Photo credits

Photos in `public/images/` are from Unsplash under the [Unsplash License](https://unsplash.com/license) (free for commercial use, no attribution required). Swap them for real project photos when available.

| File | Photographer | Source |
|---|---|---|
| `design-build-house.webp` | [Creatopy](https://unsplash.com/@creatopy) | https://unsplash.com/photos/PYL_nO-0ZjE |
| `commercial-building.webp` | [Tom PREJEANT](https://unsplash.com/@tomofficials) | https://unsplash.com/photos/qNDfQ_CkxJs |
| `commercial-plaza.webp` | [Shan A. Rajpoot](https://unsplash.com/@shanalirajpoot) | https://unsplash.com/photos/DoxMNDPfkdk |
| `residential-site-aerial.webp` | [Iain](https://unsplash.com/@photoken123) | https://unsplash.com/photos/vLNor6yATZI |
| `residential-porch.webp` | [Amanda Smith](https://unsplash.com/@asmithphotos) | https://unsplash.com/photos/_lfGDMDIJq0 |
| `team-houston-skyline.webp` | [Adrian Newell](https://unsplash.com/@anewevisual) | https://unsplash.com/photos/Itn-olYoPAg |
| `team-bridge.webp` | [Vitor Paladini](https://unsplash.com/@vtrpldn) | https://unsplash.com/photos/zfPksMTcWAA |
