# coreor.net

This project has been migrated from Vite to **Next.js (App Router)**.

## Scripts

- `npm run dev` — start Next.js dev server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run typecheck` — TypeScript type check

## Environment Variables

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_SITE_URL=https://coreor.net
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

`NEXT_PUBLIC_SITE_URL` is used for canonical URLs, Open Graph metadata, robots.txt, and sitemap generation.
`NEXT_PUBLIC_GA_ID` enables Google Analytics 4 pageview tracking.
