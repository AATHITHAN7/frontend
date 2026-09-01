# TRACE — Frontend (Phishing Attack Investigation Platform)

React + Vite single-page app. Paste in a suspicious message's sender,
subject, body, links, and attachments; get back a scored, evidence-backed
incident report with a shareable link — no manual write-up.

## Run locally

```bash
cd frontend
cp .env.example .env    # point VITE_API_URL at your backend
npm install
npm run dev
```

Opens on `http://localhost:5173`. Make sure the backend (see
`../backend/README.md`) is running at the URL set in `.env`.

## Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # sanity-check the production build locally
```

## Deploying

This is a static site after build — deploy `dist/` to Vercel, Netlify,
Cloudflare Pages, or any static host.

1. Set the environment variable `VITE_API_URL` to your deployed backend's
   URL (e.g. `https://trace-api.onrender.com`) at build time.
2. Build command: `npm run build`. Output directory: `dist`.
3. Because this is a client-side router (`react-router-dom`), configure
   your host to rewrite all paths to `index.html` (a "SPA fallback") so
   that direct visits to a shared link like `/report/<id>` work — Vercel
   and Netlify do this automatically for Vite projects; other static
   hosts may need a `_redirects` or rewrite rule.

## What it does

- **Case intake** — a form for the sender address, display name,
  reply-to, subject, body, links (actual URL + optionally the displayed
  anchor text, to catch link-text spoofing), and attachments.
- **Case file report** — a scored (0–100) verdict with a stamped verdict
  badge, a threat gauge, an auto-written narrative paragraph, every
  indicator that fired (with severity, category, and the exact evidence
  string), an indicators-of-compromise ledger, and a prioritised action
  list for the security team.
- **Share & export** — every analysis gets a shareable `/report/:id`
  link (resolved from the backend's in-memory store) and a one-click
  self-contained HTML report download.

No database, no user accounts, no tracking.
