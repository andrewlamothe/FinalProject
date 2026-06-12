# 🔮 Lumina Oracle

A mobile-first oracle card web app. Pull one card each day from an original
44-card deck, receive its message, affirmation, shadow whisper, and journal
prompt — then track your practice over time.

## Features

- **Daily card** — one card per day, woven deterministically from your
  personal seed and the date, so everyone's daily pull is unique to them and
  stays the same until midnight. Tap to flip with a 3D reveal and sparkle burst.
- **Original 44-card deck** across five elements (fire, water, air, earth,
  spirit), each with keywords, a message, a shadow aspect, an affirmation,
  and a journal prompt.
- **Intentions & journaling** — set a daily intention before your pull and
  save reflections; everything is stored privately on-device (localStorage).
- **Clarity card** — pull a second spontaneous card when the daily message
  needs clarifying.
- **Journal & streaks** — browse past pulls, intentions, and reflections;
  day-streak and totals.
- **Moon phases** — live moon phase with guidance for each of the 8 phases.
- **Deck browser** — explore all 44 cards with element filters.
- **Share** — share your card via the native share sheet (or clipboard).
- **PWA** — installable to the home screen on iPhone/Android, works offline
  via a service worker, with safe-area support for notched phones.

## Running it

It's a fully static app — no build step, no dependencies.

```sh
cd oracle-card-app
python3 -m http.server 8000
# open http://localhost:8000 on your phone or in a mobile viewport
```

To deploy, host the folder on any static host (GitHub Pages, Netlify,
Cloudflare Pages). HTTPS is required for the service worker and native
share sheet.

## Structure

```
index.html            app shell (Today / Deck / Journal / Moon views)
css/styles.css        celestial theme, card flip, animations
js/deck.js            the 44-card deck data + element palettes
js/app.js             daily draw, moon math, journal, nav, PWA boot
manifest.webmanifest  installability metadata
sw.js                 offline cache (app shell, cache-first)
icons/                SVG + PNG app icons
```
