# Skyline Doors

Marketing site for **Skyline Doors Manufacturing Pvt. Ltd.**, Mumbai — built with
React 18, Vite, React Router, Framer Motion and Lenis.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
```

## What's here

| Route       | Page                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| `/`         | Door-opening intro, hero, about strip, products, projects, stats, process |
| `/products` | All six product families with specs, applications and enquiry links      |
| `/projects` | Project grid, filterable by sector                                       |
| `/about`    | Story, values, timeline, facility, leadership & board                    |
| `/contact`  | Enquiry form, hours, address, map, FAQ                                   |
| `*`         | 404                                                                      |

## The intro

`src/components/DoorIntro.jsx` plays once on a fresh load of `/` (client-side
navigation does not replay it). A small door stands inside an architect's frame
of hairlines and swings open **in step with the loader** — the swing, the light
and the caption are all derived from one `progress` motion value, so they can
never drift out of sync with the number on screen. At 100 the light floods and
the site takes over.

Roughly 3.65s, skippable with the button or
<kbd>Esc</kbd>/<kbd>Enter</kbd>/<kbd>Space</kbd>, and reduced to an instant
hand-off when `prefers-reduced-motion` is set. The beat sheet is in the file
header; timings come from the `LOAD` / `HOLD` / `OUT` constants at the top, and
the door's size from the `--dw` custom property on `.intro`.

The countdown only starts once `document.visibilityState` is `visible`.
Browsers stall `requestAnimationFrame` in a background tab — which pauses the
animation but not a wall-clock timer — so without that gate, opening the site
in a background tab would burn the intro unseen.

## Motion

- **Lenis** (`src/App.jsx`) drives inertial page scrolling. The instance is
  exposed as `window.__lenis` so `scrollToId()` in `src/components/ui.jsx` can
  scroll in-page anchors through it.
- **`<Parallax>`** clips an image in a frame and drifts it against the scroll.
- **`<Reveal>`** fades and lifts a block once, on entering the viewport.
- **`<SplitHeading>`** slides headline lines up from behind a mask.
- **`<Counter>` / `<Stat>`** count up when scrolled into view.
- Everything collapses to a static page under `prefers-reduced-motion`.

## Content

All copy, product data, projects, hours, phone numbers and the address live in
**`src/lib/site.js`** — edit that one file rather than the components.

Business details (address, phones, email, opening hours, product families and
client list) were taken from the existing skylinedoors.in site.

### Leadership

`leadership` in `src/lib/site.js` has **Ashish** (Founder & Managing Director)
plus three board entries marked `placeholder: true`, which render an initials
tile and a "Photo to follow" label. Replace the names/bios and drop in portraits
when they're available.

## Design

The palette is sampled directly from the approved mockup and lives as custom
properties at the top of `src/styles/base.css`:

| Token          | Value     | Used for                  |
| -------------- | --------- | ------------------------- |
| `--navy-850`   | `#081722` | hero, footer              |
| `--navy-800`   | `#0a1e2c` | CTA band, dark sections   |
| `--copper`     | `#a36546` | the single accent         |
| `--ivory`      | `#fdfbf7` | light ground              |
| `--cream`      | `#f7f4ec` | alternate light ground    |
| `--sage`       | `#d1d5cc` | projects band             |

Type is Playfair Display (display) + Inter (UI/body).

## Images

Source PNGs are archived in `_source/`. `public/images/` holds WebP derivatives
at 1920 / 960 / 480 widths, served via `srcset` by the `<Img>` component in
`src/components/ui.jsx` — about 1.2 MB total, down from ~20 MB.

To regenerate after adding art, re-run the Pillow resize over `_source/` and keep
the `@960` / `@480` naming, then add the intrinsic width to the `WIDTHS` map in
`ui.jsx`.

## The enquiry form

There is no backend. `/contact` validates the fields and hands the completed
enquiry to the visitor's mail client, pre-addressed to `theskylinedoors@gmail.com`.
To collect submissions server-side instead, replace the `submit` handler in
`src/pages/Contact.jsx` with a POST to your endpoint.
