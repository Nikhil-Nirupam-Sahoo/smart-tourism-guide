# 🗺️ Smart Tourism Guide — AI Powered Travel Companion

A full-stack web application that helps travelers discover destinations, generate personalized AI itineraries, and chat with an intelligent travel assistant.

## Features

- **🔍 Destination Discovery** — Browse curated destinations with images, ratings, and categories
- **🤖 AI Itinerary Planner** — Generate day-by-day travel plans based on your interests, budget, and duration
- **💬 AI Travel Chatbot** — Conversational assistant for recommendations, local tips, and booking help
- **🗺️ Interactive Map** — View destinations and your planned route on a map
- **👤 User Profiles** — Save trips and preferences
- **📱 Responsive Design** — Works on desktop and mobile

## Tech Stack

**Frontend:** React + Vite, Tailwind CSS, Lucide React, Leaflet (maps), Axios  
**Backend:** Node.js + Express, JWT auth, CORS  
**AI:** OpenAI-compatible LLM (configurable) with a built-in mock mode for offline use

## Project Structure

```
smart-tourism-guide/
├── client/                 # React frontend (Vite + Tailwind)
├── server/                 # Express backend API
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Start the Backend

```bash
cd server
npm install
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY (optional — mock mode works without it)
npm run dev
```

Server runs on `http://localhost:5000`

### 2. Start the Frontend

```bash
cd client
npm install
npm run dev
```

App runs on `http://localhost:5173`

### 3. Open the app

Visit `http://localhost:5173` in your browser.

## AI Configuration

Edit `server/.env`:

```env
OPENAI_API_KEY=sk-...
AI_PROVIDER=openai          # openai | mock
AI_MODEL=gpt-3.5-turbo
```

Set `AI_PROVIDER=mock` to run without any API key — the built-in mock AI returns realistic travel responses.

## Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| alice@example.com | password123 | traveler |
| bob@example.com | password123 | traveler |

Or register a new account from the signup page.

## License

MIT