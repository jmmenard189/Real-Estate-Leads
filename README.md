# GTA Home Search — mygtahomesearch.com

A professional real estate lead generation website for the Greater Toronto Area. Built for buyers and sellers in Pickering, Ajax, Whitby, Markham, Vaughan, Richmond Hill, North York, and Scarborough.

---

## Features

- City/community landing pages with unique local SEO content
- Lead capture forms (buyer, seller, general) with CRM abstraction layer
- Home valuation / seller lead page
- Buyer consultation page
- Property search placeholder (IDX-ready structure)
- Mobile-first, responsive design
- FAQ accordions and testimonials sections
- Mortgage calculator placeholder
- Email alert sign-up flow
- Centralized content config for easy editing

---

## Project Structure

```
/
├── artifacts/
│   ├── gta-home-search/         # React + Vite frontend
│   │   ├── public/
│   │   │   ├── robots.txt       # Search engine crawler rules
│   │   │   ├── sitemap.xml      # XML sitemap for all pages
│   │   │   ├── favicon.svg
│   │   │   └── images/          # Community hero images
│   │   └── src/
│   │       ├── pages/           # All route pages
│   │       ├── components/      # Reusable UI components (Navbar, Footer, LeadForm)
│   │       ├── content/         # Centralized content config files
│   │       │   ├── site-config.ts    # Phone, email, address, social links
│   │       │   ├── communities.ts    # All 8 GTA community data
│   │       │   ├── testimonials.ts   # Testimonial data (placeholder)
│   │       │   └── faqs.ts           # FAQ data organized by page
│   │       └── App.tsx          # Router setup
│   └── api-server/              # Express API server
│       └── src/
│           ├── routes/
│           │   ├── leads.ts     # POST /api/leads — lead capture
│           │   ├── idx.ts       # GET /api/idx/* — IDX placeholder (future)
│           │   └── health.ts    # GET /api/healthz
│           └── lib/
│               └── crm.ts       # CRM abstraction (Follow Up Boss / webhook / email)
└── lib/
    ├── db/src/schema/
    │   └── leads.ts             # Leads database table
    └── api-spec/openapi.yaml    # API contract (OpenAPI 3.1)
```

---

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage — hero, lead form, communities, process, FAQ |
| `/search` | Search homes (IDX placeholder — live search coming) |
| `/communities` | All communities index |
| `/communities/pickering` | Pickering area page |
| `/communities/ajax` | Ajax area page |
| `/communities/whitby` | Whitby area page |
| `/communities/markham` | Markham area page |
| `/communities/vaughan` | Vaughan area page |
| `/communities/richmond-hill` | Richmond Hill area page |
| `/communities/north-york` | North York area page |
| `/communities/scarborough` | Scarborough area page |
| `/buyers` | Buyer landing page |
| `/sellers` | Seller / home valuation page |
| `/contact` | Contact page |
| `/about` | About page |
| `/privacy` | Privacy policy |
| `/terms` | Terms and disclaimer |

---

## Environment Variables

**Never hardcode credentials.** Set all the following as environment variables / secrets:

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `SESSION_SECRET` | Yes | Session signing secret |
| `FOLLOW_UP_BOSS_API_KEY` | Optional | Follow Up Boss CRM integration |
| `FOLLOW_UP_BOSS_SYSTEM` | Optional | FUB system name tag (default: `mygtahomesearch`) |
| `WEBHOOK_URL` | Optional | Zapier or custom webhook for lead delivery |
| `NOTIFICATION_EMAIL` | Optional | Email address for lead notification fallback |
| `IDX_API_KEY` | Future | IDX provider API key (when IDX is added) |
| `IDX_API_SECRET` | Future | IDX provider API secret |

---

## Running Locally

### Prerequisites
- Node.js 20+
- pnpm 9+
- PostgreSQL database

### Setup

```bash
# Install dependencies
pnpm install

# Set environment variables
cp .env.example .env
# Edit .env with your values

# Push database schema
pnpm --filter @workspace/db run push

# Start API server (in one terminal)
pnpm --filter @workspace/api-server run dev

# Start frontend (in another terminal)
pnpm --filter @workspace/gta-home-search run dev
```

### Build for production

```bash
# Build frontend (outputs static files)
pnpm --filter @workspace/gta-home-search run build

# Build API server
pnpm --filter @workspace/api-server run build
```

---

## Updating Content

All main content lives in `artifacts/gta-home-search/src/content/`:

| File | What to edit |
|------|-------------|
| `site-config.ts` | Phone number, email address, office address, social links, legal disclaimer |
| `communities.ts` | Area descriptions, features, amenities for each of the 8 GTA communities |
| `testimonials.ts` | Client testimonials (replace placeholders before launch) |
| `faqs.ts` | FAQ questions and answers organized by page |

---

## CRM Integration (Follow Up Boss)

The CRM abstraction layer is in `artifacts/api-server/src/lib/crm.ts`.

Leads are dispatched in priority order:
1. **Follow Up Boss** — if `FOLLOW_UP_BOSS_API_KEY` is set
2. **Webhook** — if `WEBHOOK_URL` is set (works with Zapier, Make, n8n)
3. **Email notification** — if `NOTIFICATION_EMAIL` is set
4. **Server log** — always as a fallback

### Lead source tags

| Source | Tag |
|--------|-----|
| Homepage | `mygtahomesearch-home` |
| Buyer page | `mygtahomesearch-buyer` |
| Seller page | `mygtahomesearch-seller` |
| Contact page | `mygtahomesearch-contact` |
| Pickering | `mygtahomesearch-pickering` |
| Ajax | `mygtahomesearch-ajax` |
| Whitby | `mygtahomesearch-whitby` |
| Markham | `mygtahomesearch-markham` |
| Vaughan | `mygtahomesearch-vaughan` |
| Richmond Hill | `mygtahomesearch-richmond-hill` |
| North York | `mygtahomesearch-north-york` |
| Scarborough | `mygtahomesearch-scarborough` |

---

## Adding IDX (Future)

The IDX placeholder is at `artifacts/api-server/src/routes/idx.ts`.

To add live listings:
1. Choose a TRREB-approved IDX provider (iHomeFinder, Real Geeks, Showcase IDX, CREA DDF®)
2. Set `IDX_API_KEY` and `IDX_API_SECRET` in your environment
3. Replace the placeholder handlers in `idx.ts` with real API calls
4. Update the search page at `artifacts/gta-home-search/src/pages/SearchPage.tsx`

---

## Deployment

This project is configured for Replit deployment. After any code change:

1. Review the app in preview
2. Click **Publish** to deploy to production
3. Connect your custom domain `mygtahomesearch.com` in the deployment settings

For external hosting (Vercel, Railway, Render):
- Frontend: build output is in `artifacts/gta-home-search/dist/` (static files)
- API: build output is in `artifacts/api-server/dist/index.mjs` (Node.js ESM)

---

## SEO

- `robots.txt` — located at `artifacts/gta-home-search/public/robots.txt`
- `sitemap.xml` — located at `artifacts/gta-home-search/public/sitemap.xml`
- Update `sitemap.xml` with your live domain before deploying
- Each page sets a unique `document.title` for SEO

---

## Legal & Compliance

- All testimonials are marked as placeholders and must be reviewed before publishing
- The disclaimer in `site-config.ts` should be reviewed and approved before launch
- This site does not display live MLS® data — the search page is a placeholder
- Ensure all content complies with applicable Ontario real estate marketing regulations

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run `pnpm run typecheck` to verify TypeScript
4. Open a pull request with a clear description of changes

---

## Contact

Update contact details in `artifacts/gta-home-search/src/content/site-config.ts`.
