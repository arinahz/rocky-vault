# Reca Clinic website

Astro + Tailwind CSS, static output. BM first.

## Edit content

All clinic content (services, doctors, FAQs, reviews, hours, WhatsApp number) is in
`src/data/clinic.ts`. Anything marked `[TODO]` still needs real information.
Adding a service object there creates a new page at `/perkhidmatan/<slug>/`.

## Run locally

Needs Node 22.23.4 or newer (see `.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs plain HTML/CSS to dist/
```

## Status

Built: Home, Services hub, service page template, 404, header, footer, sticky WhatsApp CTA.
Not built yet: About/Doctors, Reviews, Contact, Privacy (phase 5); tracking, SEO, schema (phase 6).
