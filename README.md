# CineInsight — AI Movie Insight Builder

> Enter any IMDb movie ID → get AI-powered audience sentiment, cast, ratings & more.

Built for **Brew Full-Stack Developer Internship** assignment using **Next.js (JavaScript)**.

---

## Features

- 🎬 Movie title, poster, cast, year, runtime, genre, plot
- ⭐ IMDb, Rotten Tomatoes & Metacritic ratings
- 🤖 Gemini AI audience sentiment summary
- 📊 Sentiment score bar + positive / mixed / negative classification
- ✅ IMDb ID format validation with error messages
- 📱 Fully responsive (mobile + desktop)
- ✨ Shimmer skeleton loading, smooth animations, cinematic dark UI

---

## Tech Stack

| Layer | Tech | Why |
|---|---|---|
| Frontend | Next.js 14 + React (JS) | SSR + API routes in one project, Vercel-optimised |
| Movie Data | OMDB API (free) | Reliable structured IMDb data, poster URLs |
| AI | Google Gemini 1.5 Flash | Fast inference, free tier, great structured JSON output |
| Styling | CSS variables + inline styles | Zero dependencies, full control |
| Testing | Jest | Simple, works great for utility/validation tests |
| Deploy | Vercel | 1-click GitHub deploy, native Next.js support |

---

## Setup

### 1. Install

```bash
npm install
```

### 2. Add API Keys

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in:

```
OMDB_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```

- Free OMDB key → https://www.omdbapi.com/apikey.aspx
- Free Gemini key → https://aistudio.google.com/app/apikey

### 3. Run

```bash
npm run dev
# open http://localhost:3000
```

### 4. Test

```bash
npm test
```

---

## Deploy to Vercel

1. Push to GitHub
2. Go to vercel.com → New Project → import your repo
3. Add environment variables: `OMDB_API_KEY` and `GEMINI_API_KEY`
4. Deploy ✅

---

## Project Structure

```
src/
├── app/
│   ├── api/movie/route.js     # GET /api/movie?id=ttXXXXXXX
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── SearchBar.js
│   ├── MovieCard.js
│   ├── LoadingState.js
│   └── ErrorMessage.js
├── lib/
│   ├── omdb.js                # OMDB API + ID validation
│   └── gemini.js              # Gemini AI sentiment
└── __tests__/
    └── validation.test.js
```

---

## API

```
GET /api/movie?id=tt0133093
```

**Success:**
```json
{
  "movie": { "Title": "The Matrix", "Year": "1999", ... },
  "sentiment": {
    "summary": "Audiences were blown away...",
    "sentiment": "positive",
    "score": 92,
    "highlights": ["Groundbreaking VFX", "Iconic story", "Career-defining performances"]
  }
}
```

**Error:**
```json
{ "error": "Movie not found" }
```

---

## Assumptions

1. **Review scraping**: IMDb blocks direct scraping. Gemini AI uses its trained knowledge + structured rating data (IMDb score, RT %, Metacritic) to generate accurate sentiment — this is the most reliable approach.
2. **OMDB free tier**: 1000 requests/day, responses cached 1 hour server-side.
3. **IMDb ID format**: Always `tt` + 7-8 digits per IMDb convention.
