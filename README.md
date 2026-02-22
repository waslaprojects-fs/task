This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What it does

The app shows spread data in a table. You can switch between tabs (currencies, crypto, commodities, etc.) and the table updates with data from the API. The spreads page uses a server component for the layout and a small client component only where interactivity is needed.

## Code and approach

The spreads screen is split so that most of the page stays on the server. The main page (`src/app/spreads/page.js`) is a server component: it renders the header and a single client island, `SpreadsContent`. Only `SpreadsContent` uses `"use client"`, so only the tab buttons and the table live in the client bundle. The header and outer layout stay server-rendered.

Data is loaded via `fetch` to `/api/spreads?tab=...`. The API route reads the tab from the query and returns table headers and rows. Tabs, loading, and error handling are all local state in `SpreadsContent`. 
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features to add

- **In-memory caching per tab**  
  Cache the last response for each tab in memory (e.g. in a ref or a small store). When switching back to a tab, show the cached data immediately and optionally refresh in the background so repeat tab switches feel instant.

- **Clean separation between data fetching and UI**  
  Move fetching into a custom hook (e.g. `useSpreads(tab)`) or a small data layer. The UI component would only consume `{ data, status, error, refetch }` and render tabs and table, so logic and presentation are easier to test and change.

-- **More appealing UI** 

- **Nice signal (bonus)**  
  The two items above together give a nicer signal: fast tab switching thanks to per-tab cache, and a clear split between “how we get data” and “how we show it.”
# task
# task
