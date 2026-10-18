# Calibro migration audit

## What the supplied source confirms

### Critical lead-loss issues in the current Vite/React build
1. **The contact form does not send an enquiry.** `src/components/ContactForm.jsx` only changes local state to `sent`. It has no API request and no backend. Visitors are shown “Message sent” even though nothing is transmitted.
2. **The product-detail “Ask for information” button has no action.** It is a styled `<button>` without an `onClick`, link or form action.
3. **The initial HTML body is empty.** `index.html` contains `<div id="root"></div>` and the page content is created after JavaScript loads.
4. **Route metadata is browser-only.** `src/main.jsx` changes title, description and canonical inside `useEffect`. A non-JavaScript crawler receives the homepage metadata for every SPA fallback URL.
5. **Project and product detail metadata is not unique even after JavaScript.** `/projects/:id` is reduced to the `/projects` metadata and `/products/:id` to `/products`.
6. **The homepage has no H1.** The hero commercial phrase is a `<p>`, while the permanent page contains H2s only.
7. **Important old routes disappeared.** The old Next build had `/about`, `/our-factory`, `/services`, `/network`, `/projects` and `/primo-penthouse`. The current SPA exposes only home, projects and products plus their dynamic detail routes.
8. **Internal commercial linking became weaker.** The current primary navigation points About and Contact to homepage hash sections rather than keeping the old standalone authority pages in the site architecture.
9. **Broken/non-destination footer links exist.** Instagram and Privacy use `href="#"` in the supplied React source.
10. **The new footer/contact block removed the direct telephone link** that existed in the older lead-oriented Next build.

### What the old Next build did better
- Server/App-Router pages returned real page content in the first HTML response.
- Homepage metadata explicitly targeted **“Custom Furniture Manufacturer in Dubai.”**
- `/about` and `/our-factory` had self-referencing canonicals and dedicated descriptions.
- The content repeatedly established the entity as a Dubai custom furniture factory/manufacturer serving architects, designers, developers and private clients.
- The contact experience offered WhatsApp, email, telephone, showroom address and a form.
- The form called `/api/contact`, and that API used Nodemailer to send the enquiry.
- Factory/service content explained manufacturing, joinery, metalwork, upholstery, finishing, quality control, delivery and installation in commercially useful language.

## Important: the old site was not perfect
The migration should not simply restore the old source. Several old route layouts lacked dedicated metadata, the old services page contained unrelated art/curatorial copy, some image alt text was generic, and its contact mailer still contained the wrong “Casa Kraft Interiors Website” sender label. The rebuild therefore keeps the useful search positioning and lead architecture while fixing those weaknesses.

## Implemented in this rebuild
- Next.js App Router foundation.
- Current React visual components preserved as the design layer.
- Vite/React Router removed.
- Server metadata and self-referencing canonicals.
- Homepage target restored to **Custom Furniture Manufacturer in Dubai**.
- Visible homepage H1 restored without redesigning the hero layout.
- `/about`, `/our-factory` and `/services` restored with current-style SEO content.
- `/projects/[id]` gets unique server metadata for all 9 supplied projects.
- `/products/[id]` gets unique server metadata if a product URL is used.
- XML sitemap and robots route.
- LocalBusiness/Organization schema in the server HTML.
- `/primo-penthouse` 301s to `/projects/il-primo-penthouse`.
- `/network` 301s to `/services`.
- www host redirects to the non-www canonical.
- Contact form now POSTs to `/api/contact` and only shows success after a successful server response.
- SMTP route fixed and rebranded for Calibro.
- Product “Ask for information” now links to the enquiry section.
- Telephone restored in the footer.
- Broken `#` privacy link replaced with a real route.
- Optional GTM support through `NEXT_PUBLIC_GTM_ID` and a `form_submit` dataLayer event.

## Deployment prerequisites
The supplied React ZIP did not contain `public/`, so this rebuild intentionally does not contain the site's media assets. Copy the current live project's `public/` directory into this project before running/deploying it. Populate the SMTP variables from the previous working setup or the form cannot deliver email.

Before production, confirm the exact Google Business Profile address/name format. The rebuild currently uses the older site's address text: **1, Jebel Ali Industrial Area, 47th Street, Dubai, UAE**. Schema and visible NAP should exactly match the verified GBP listing.

## Still needed for recovery work after deployment
- Export pre-switch GSC Pages + Queries and create redirects for any historical URLs not represented in the two supplied source archives.
- Connect and test GTM/GA4 lead events for form, WhatsApp, phone and email.
- Test the form using the real SMTP environment on Vercel.
- Submit the sitemap in GSC and inspect priority URLs.
- Compare GBP website clicks/calls and organic landing-page conversions against the pre-switch period.
