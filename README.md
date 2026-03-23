# Bote a Carga

A mobile-first PWA for calculating training weights based on percentages of a given 1RM. Built for CrossFit and gym athletes who need fast answers mid-workout.

No login. No onboarding. Works offline.

---

## Features

- Input your 1RM (or any reference weight)
- Pick a percentage from quick buttons or type a custom one
- Instantly see:
  - Exact calculated weight
  - Rounded, rack-ready weight
  - Plate breakdown per side

---

## Stack

- React 19 + Vite 8 + TypeScript
- PWA via `vite-plugin-pwa` (Workbox service worker)
- No backend — all state in localStorage
- Analytics via Google Analytics 4 (optional)
- Deploy: Vercel

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in any values you need:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `VITE_GA_ID` | No | Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`) |

---

## Project structure

```
src/
  App.tsx           # main component and UI
  App.css           # styles
  lib/
    calculator.ts   # calculation logic (percentages, rounding, plate math)
    storage.ts      # localStorage read/write
plans/              # feature roadmap
```

---

## Settings

Accessible via the gear icon:

| Setting | Options |
|---|---|
| Rounding step | 1 / 2.5 / 5 (in the active unit) |
| Rounding mode | Nearest / Up / Down |

Bar weight (15 kg women's / 20 kg men's) is selectable directly in the plate breakdown section.

---

## Deployment

Connect the repository to Vercel — it auto-detects the Vite setup. No build configuration needed.

For GA4, add `VITE_GA_ID` as an environment variable in Vercel's project settings.
