# Calibro — Next.js rebuild

This project combines the **visual design of the current React/Vite site** with the **server-rendered Next.js architecture and search positioning of the previous lead-generating site**.

## What is preserved

- Current Calibro homepage design, splash, motion, theme control, spotlight, project presentation and responsive styling.
- Current project data and project-detail design.
- Current product-detail source and product data.
- Existing public asset paths, so the original `public/` folder can be copied over without renaming the media library.

## What changed

- Vite + React Router replaced with Next.js App Router.
- Search metadata is generated server-side per route.
- Canonicals are self-referencing instead of all pointing to the homepage.
- `/about`, `/our-factory` and `/services` are restored as crawlable pages in the current visual language.
- Project routes are statically generated with unique metadata and structured data.
- Product detail routes are `noindex` while the public Products page says “Coming Soon”. Set `PRODUCTS_LIVE=true` only when the collection is ready for indexing.
- Contact form now sends through `/api/contact` using SMTP and reports success only after delivery is accepted by the mail transport.
- WhatsApp, phone, email and form actions are pushed to `dataLayer` for GTM/GA4 conversion tracking.
- `robots.txt`, `sitemap.xml`, real 404 handling and old-route redirects are included.

## Before running

The large `public/` directory was not included in the uploaded source ZIP. Copy the **entire `public` folder from the current React/Vite project** into this project root:

```text
calibro-next/
├── public/        <-- copy the existing React public folder here
├── src/
├── package.json
└── ...
```

Do not rename the folders inside `public/`. The migrated components intentionally preserve the existing asset URLs.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the SMTP credentials used for the website enquiry mailbox.

```bash
cp .env.example .env.local
```

Optional but recommended:

- `NEXT_PUBLIC_GTM_ID` — Google Tag Manager container ID.
- `GOOGLE_SITE_VERIFICATION` — Search Console verification token.
- `PRODUCTS_LIVE=false` — keep false until the product collection is publicly launched.

## Run locally

```bash
npm install
npm run validate:data
npm run check:assets
npm run dev
```

Then open `http://localhost:3000`.

## Production validation

Before changing the live domain to this build:

```bash
npm run build
npm start
```

Check these URLs:

- `/`
- `/about`
- `/our-factory`
- `/services`
- `/projects`
- every `/projects/[id]`
- `/products`
- `/privacy-policy`
- `/robots.txt`
- `/sitemap.xml`

Submit a real test enquiry, click the phone and WhatsApp links, and verify the corresponding GA4/GTM events.

## Deployment

The project is ready for a normal Next.js Vercel deployment. Add the same environment variables in Vercel before switching the production domain.

The configured production canonical is `https://calibro.ae` and `www.calibro.ae/*` permanently redirects to the non-www domain.
