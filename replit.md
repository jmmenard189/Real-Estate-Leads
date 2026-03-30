# GTA Home Search — My GTA Home Search

## Overview

A professional GTA real estate lead generation website for **mygtahomesearch.com**. Built to capture buyer and seller leads across the Greater Toronto Area, particularly Pickering, Ajax, Whitby, Markham, Vaughan, Richmond Hill, North York, and Scarborough.

This is a lead generation platform (not a personal branding site) — every page is designed for conversion with lead capture forms, local SEO copy, and CRM integration points.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod, drizzle-zod
- **API codegen**: Orval (from OpenAPI spec)
- **Frontend**: React + Vite (Tailwind, shadcn/ui, framer-motion)
- **Routing**: wouter
- **Forms**: react-hook-form + zod
- **Build**: esbuild (server), Vite (frontend)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── gta-home-search/        # React + Vite frontend (serves at /)
│   │   └── src/
│   │       ├── pages/          # All pages (Home, Communities, Buyers, Sellers, etc.)
│   │       ├── components/     # Reusable UI components (LeadForm, etc.)
│   │       ├── content/        # Centralized content config files
│   │       │   ├── site-config.ts   # Phone, email, brokerage info
│   │       │   ├── communities.ts   # All 8 GTA communities data
│   │       │   ├── testimonials.ts  # Placeholder testimonials
│   │       │   └── faqs.ts          # FAQ data by page
│   │       └── App.tsx         # Router setup
│   └── api-server/             # Express API server (serves at /api)
│       └── src/
│           ├── routes/
│           │   ├── leads.ts    # POST /api/leads — lead capture endpoint
│           │   └── health.ts   # GET /api/healthz
│           └── lib/
│               └── crm.ts      # CRM abstraction (Follow Up Boss / webhook / email)
├── lib/
│   ├── api-spec/openapi.yaml   # API contract (single source of truth)
│   ├── api-client-react/       # Generated React Query hooks
│   ├── api-zod/                # Generated Zod schemas
│   └── db/src/schema/
│       └── leads.ts            # Leads table schema
└── replit.md
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, lead form, communities, buyers, sellers, FAQ |
| `/search` | Search homes placeholder (IDX coming soon) |
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
| `/about` | About / brokerage info |
| `/privacy` | Privacy policy |
| `/terms` | Terms and disclaimer |

## Editing Content

All main content is centralized in `artifacts/gta-home-search/src/content/`:

- **`site-config.ts`** — Update phone number, email, brokerage name, social links
- **`communities.ts`** — Update area descriptions, features, amenities
- **`testimonials.ts`** — Replace placeholder testimonials with real ones (brokerage review required)
- **`faqs.ts`** — Update FAQ questions and answers per page

## CRM Integration

The CRM abstraction is in `artifacts/api-server/src/lib/crm.ts`.

Set these environment variables/secrets to activate:

| Variable | Purpose |
|----------|---------|
| `FOLLOW_UP_BOSS_API_KEY` | Follow Up Boss API key |
| `FOLLOW_UP_BOSS_SYSTEM` | System name tag (default: "mygtahomesearch") |
| `WEBHOOK_URL` | Zapier / custom webhook URL |
| `NOTIFICATION_EMAIL` | Email notification recipient |

## Lead Source Tags

Leads are tagged with source identifiers:
- `mygtahomesearch-home` — Homepage
- `mygtahomesearch-buyer` — Buyer page
- `mygtahomesearch-seller` — Seller page
- `mygtahomesearch-pickering` / `-ajax` / `-whitby` etc. — Area pages
- `mygtahomesearch-contact` — Contact page

## Brokerage Info

- **Brokerage**: RE/MAX West Realty Inc., Brokerage
- Update contact details in `src/content/site-config.ts`
- All testimonials marked as placeholders pending brokerage review
- Compliance disclaimer included in footer

## Development Commands

```bash
# Start API server
pnpm --filter @workspace/api-server run dev

# Start frontend
pnpm --filter @workspace/gta-home-search run dev

# Push DB schema changes
pnpm --filter @workspace/db run push

# Run codegen after OpenAPI changes
pnpm --filter @workspace/api-spec run codegen
```

## Future: IDX Integration

The search page (`/search`) is designed as a placeholder. When adding IDX:
1. Replace the placeholder search UI in `artifacts/gta-home-search/src/pages/SearchPage.tsx`
2. Add IDX listing components
3. Keep the lead capture forms in place

## Future: Blog / SEO Expansion

The structure supports adding a blog section — add new pages in `src/pages/` and register them in `App.tsx`.
