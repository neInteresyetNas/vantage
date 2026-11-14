# VANTAGE — MW4 Camo Tracker
Next.js 15 + React 19 + TypeScript + Tailwind 3 + Framer Motion + Supabase (optional).
## Run
npm install && npm run dev   # http://localhost:3000
npm run typecheck && npm run lint && npm test && npx playwright install chromium && npm run e2e
npm run build && npm start   # production
## Model
33 weapons / 9 classes (src/data/mw4-weapons.ts). Per weapon: 11 Military+Special camos -> Gold (automatic) -> Platinum -> Harmonic Break. Divergence unlocks at 33 Harmonic Breaks. 13 tracked steps per weapon.
## Cloud sync (optional)
1. Create a Supabase project, run supabase/schema.sql (RLS: each user only sees own row).
2. Copy .env.example to .env.local and fill URL + anon key (never use the service key in the frontend).
3. Local and cloud progress are union-merged on login, so nothing completed is lost. Without keys the app is fully local.
## Images
`npm install` runs `scripts/fetch-camos.mjs`, which downloads camo and (4 known) weapon images from the WZHUB CDN into `public/` for personal local use (needs internet; `npm run assets` to retry). Camo order (Military 1-8, Special placeholder, Gold, Platinum, Harmonic Break, Divergence) follows the source page order — check it visually. Other weapons show no thumbnail.

## Needs verification
Challenge texts per camo were not published on the source tracker; they show "NEEDS VERIFICATION". Fill CAMO_TEXT in the data file. Cronen Osprey and CSG-35 were not on the source tracker and are omitted. DLC filter is not implemented (the source data does not say which weapons are DLC). Language switch has EN/RU for navigation and hero only (src/lib/settings.tsx). This project was written without network access and has NOT been installed, built or tested yet.
