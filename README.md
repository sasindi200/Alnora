# Alnora Gallery

Art gallery web app with:
- React + Vite + TypeScript frontend
- Express + SQLite backend
- Supabase authentication (login/signup)
- Protected routes for app access

## Features

- Auth-first app flow (`/auth` required before using the app)
- Email/password signup + login with Supabase
- Protected pages (`/`, `/collection`, `/upload`, `/profile`, `/about`)
- Community artwork upload and voting
- Owner-only delete for uploaded artworks

## Tech Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend: Node.js, Express, SQLite, Multer
- Auth: Supabase (`@supabase/supabase-js`)

## Environment Variables

Create a `.env` file in project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Notes:
- Use your Supabase Publishable key (`sb_publishable_...`).
- Do not commit `.env`.

## Supabase Dashboard Setup

1. Create a Supabase project.
2. Enable Email provider:
   - `Authentication > Providers > Email`
3. Set auth URLs:
   - `Authentication > URL Configuration`
   - Site URL: `http://localhost:5173`
   - Redirect URL: `http://localhost:5173/auth`
4. Copy Project URL + Publishable key into `.env`.

## Local Development

Install dependencies:

```bash
npm install
```

Run frontend + backend together:

```bash
npm run dev:full
```

Frontend:
- `http://localhost:5173`

Backend API:
- `http://localhost:3001`

## Scripts

- `npm run dev` - start Vite frontend
- `npm run server` - start Express backend
- `npm run dev:full` - run frontend + backend together
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run test` - run tests

## Project Structure

```txt
server/
  index.js
src/
  components/
  context/
  lib/
  pages/
  data/
  hooks/
  App.tsx
  main.tsx
```
