# Holiday - Affiliate Shop

Affiliate-Partnershop für Wellness- und Reiseangebote, powered by Adcell.

## Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Express.js
- **Database**: PostgreSQL mit Drizzle ORM
- **Deployment**: Netlify

## Features

- Live-Produktfeeds von Adcell (Wellness & Reisen)
- Kategoriefilterung und Suche
- Preisvergleich und Sortierung
- Responsive Design
- SEO-optimiert (Sitemaps, robots.txt)

## Adcell Feeds

- Promo ID 46013 (Reisen): https://www.adcell.de/promotion/csv?promoId=46013&slotId=66376
- Promo ID 363820 (Produkte): https://www.adcell.de/promotion/csv?promoId=363820&slotId=66376
- Slot ID: 66376

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL Datenbank-Verbindungsstring
- `NODE_ENV`: development oder production
- `PORT`: Server-Port (Standard: 5000)

## Deployment

Das Projekt wird auf Netlify deployed. Die CSV-Feeds werden zur Laufzeit von Adcell geladen.
