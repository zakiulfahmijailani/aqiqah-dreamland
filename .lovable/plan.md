

## Aqiqah Invitation App — Port & Visual Upgrade Plan

### Phase 1: Port Existing Next.js App to React/Vite

Port all existing components from the GitHub repo, removing `'use client'` directives and adapting `process.env.NEXT_PUBLIC_*` to Vite's `import.meta.env.VITE_*` pattern.

**Files to create (ported as-is):**
- `src/hooks/useReducedMotion.ts` — reduced motion hook
- `src/lib/supabase.ts` — Supabase client (adapted for Vite env vars)
- `src/components/BismillahCalligraphy.tsx` — Arabic calligraphy component
- `src/components/BabyIllustrations.tsx` — MuslimBabyBoy, BabyMoon, FloatingStars, etc.
- `src/components/ScrollProgressBar.tsx` — scroll progress indicator
- `src/components/WaveDivider.tsx` — wave section dividers
- `src/components/FootprintsAnimation.tsx` — animated footprints
- `src/components/AnimatedBackground.tsx` — background animations
- `src/components/CoverSection.tsx` — cover/envelope with confetti
- `src/components/BabyNamesSection.tsx` — baby name display with typewriter effect
- `src/components/EventDetailsSection.tsx` — event details with clock/calendar
- `src/components/MapsSection.tsx` — Google Maps embed
- `src/components/RSVPSection.tsx` — RSVP form with Supabase
- `src/components/WishesSection.tsx` — wishes/guestbook with Supabase
- `src/components/MusicPlayer.tsx` — floating music player
- `src/components/ClosingSection.tsx` — closing message

**Rewire Index page** (`src/pages/Index.tsx`) to replicate the Next.js `page.tsx` layout — cover → content sections → music player.

**Install dependencies:** `framer-motion`, `canvas-confetti`, `@supabase/supabase-js`

### Phase 2: Visual Design Upgrades (5 Tasks)

#### Task 1 — Create `src/components/AqiqahDecorations.tsx`
New file with 7 animated SVG components using Framer Motion:
- **CuteSheep** — fluffy white sheep with gentle sway animation, supports flip prop
- **BabyCradle** — wooden rocking cradle with baby inside, rocking animation
- **FloatingFeather** — soft feather drifting down with x-drift
- **IslamicStarPattern** — cluster of 3 pulsing 8-pointed Islamic stars
- **MuslimBabyBoySeated** — baby boy in jubah + peci, gentle bounce (no facial features)
- **MoonAndStars** — crescent moon with twinkling stars
- **SheepFamily** — three CuteSheep of different sizes walking together

All respect `useReducedMotion`, have transparent backgrounds, use inline SVG only.

#### Task 2 — Redesign `AnimatedBackground.tsx`
Replace the plain background with:
- Soft mint → pink → cream gradient (linear-gradient 160deg)
- Layer A: SheepFamily + individual sheep at bottom
- Layer B: MoonAndStars in top corners
- Layer C: 5 FloatingFeathers at varied positions
- Layer D: 3 IslamicStarPattern clusters scattered around

#### Task 3 — Enhance `CoverSection.tsx` decorations
Keep all existing logic (confetti, curtain, button). Replace the floating decorations with AqiqahDecorations components:
- MoonAndStars top-left, IslamicStarPattern top-right
- CuteSheep on both sides in the middle
- BabyCradle bottom-left, MuslimBabyBoySeated bottom-center, CuteSheep bottom-right
- Increase decorations opacity from 0.30 to 0.40

#### Task 4 — Enhance `BabyNamesSection.tsx`
Keep all existing content. Add:
- Decorative header row above the name card (CuteSheep + BabyCradle + flipped CuteSheep)
- Two sheep flanking the sides of the name card

#### Task 5 — Add sheep parade to `ClosingSection.tsx`
Keep all existing content. Add a SheepFamily component at the bottom after the closing text, with 30% opacity and overflow hidden.

