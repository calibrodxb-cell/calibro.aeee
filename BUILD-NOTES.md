# Calibro build notes

## Build principle

**Visual layer:** current React/Vite website.

**Technical/search layer:** Next.js App Router, server metadata, static route generation and the stronger search intent from the older Next.js website.

The migration deliberately does **not** rewrite the design into Tailwind components. The current CSS and animation system is retained because it is already the approved visual design. Tailwind remains available for the few utility classes already present in the React source.

## Lead-critical fixes

1. The React form previously changed its UI to “Message sent” without sending the enquiry anywhere. The new form POSTs to `/api/contact` and only confirms success after the SMTP send succeeds.
2. Phone calling is restored as a direct lead path in addition to WhatsApp and email.
3. A global click tracker pushes `phone_click`, `whatsapp_click` and `email_click` events to `dataLayer`.
4. Successful form delivery pushes `form_submit`.

## SEO-critical fixes

1. Full Next.js HTML response rather than a Vite SPA shell.
2. Unique metadata and self-referencing canonicals per route.
3. Static project-detail generation with unique project metadata.
4. Crawlable `/about`, `/our-factory`, `/services`, `/projects` and project-detail URLs.
5. XML sitemap and robots route.
6. Organization/LocalBusiness + WebSite schema on the site, BreadcrumbList on deeper pages and CreativeWork schema on project detail pages.
7. Proper 404 page.
8. Permanent redirects for the old `/network` and `/primo-penthouse` routes plus www → non-www.
9. Product detail pages remain `noindex` until the product collection is launched, preventing unfinished/orphan product URLs from becoming an indexing problem.

## Asset limitation in this package

The user uploaded source-only ZIPs. The current React `public/` directory — containing the large videos, project photographs, furniture renders and favicons — is not present here. The final source keeps those exact paths so no media migration or renaming is required. Copy the current site's `public/` folder into the project before visual QA or deployment.

## Verification completed in this environment

- React Router / Vite routing references removed.
- Relative imports checked: no missing internal import targets.
- Client-component directive audit checked for files that access hooks/browser globals.
- Project/product data validated: 9 projects and 54 products with unique IDs.
- Full `next build` could not be executed in this sandbox because dependency installation timed out. A production build must therefore be run after `npm install` in the development/Vercel environment before domain cutover.
