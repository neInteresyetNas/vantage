# VANTAGE — MW4 Camo Tracker
Next.js 15 + React 19 + TypeScript + Tailwind 3 + Framer Motion + Supabase (optional).
## Run
npm install && npm run dev   # http://localhost:3000
npm run typecheck && npm run lint && npm test && npx playwright install chromium && npm run e2e
npm run build && npm start   # production
## Model
35 weapons / 9 classes (src/data/mw4-weapons.ts). Per weapon: 11 Military+Special camos -> Gold -> Platinum -> Harmonic Break (each unlocks the next). Divergence unlocks at 33 Harmonic Breaks. 14 tracked steps per weapon.
## Cloud sync (optional)
1. Create a Supabase project, run supabase/schema.sql (RLS: each user only sees own row).
2. Copy .env.example to .env.local and fill URL + anon key (never use the service key in the frontend).
3. Local and cloud progress are union-merged on login, so nothing completed is lost. Without keys the app is fully local.
## Images
`npm install` runs `scripts/fetch-camos.mjs`, which downloads camo icons, Gold/Platinum/Harmonic Break/Divergence art and weapon thumbnails from assets.codmunity.gg into `public/` for personal local use (needs internet; `npm run assets` retries). Do not publicly host them. Missing files fall back to placeholders.

## Needs verification
Multiplayer challenge texts are filled in for 6 weapons (KG-7 Vulcan, Rezi 12, ISO Nightshade, FiNN LMG, MAR-9, Sang 9mm) in `INFO` in the data file; the other 29 show NEEDS VERIFICATION. Military level requirements are likewise only known for those 6. DLC filter is not implemented. Language switch has EN/RU for navigation and hero only. This project was written without network access and has NOT been installed, built or tested yet.
