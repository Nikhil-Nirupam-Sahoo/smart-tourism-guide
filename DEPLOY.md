# 🚀 Deployment Guide — Smart Tourism Guide

Two hosting options below. **Render (Option A)** is recommended — one platform, one free tier, full-stack.

---

## Option A: Render (Recommended) — Full Stack

Render hosts both your Node.js API and React frontend. Data persists via MongoDB Atlas (free).

### Prerequisites
- GitHub account
- Render account (https://render.com)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas) — free M0 cluster

### 1. Push code to GitHub

```bash
cd /home/nikhil/smart-tourism-guide
git init
git add .
git commit -m "Initial commit"
# Create a repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/smart-tourism-guide.git
git branch -M main
git push -u origin main
```

### 2. Create MongoDB Atlas database
1. Log in to MongoDB Atlas, create a free **Shared (M0)** cluster.
2. **Network Access** → Add IP Address → `0.0.0.0/0` (allow all, so Render can connect).
3. **Database Access** → Add a database user (username/password).
4. **Connect** → Drivers → copy your connection string. It looks like:
   ```
   mongodb+srv://<user>:<pass>@cluster0.xxx.mongodb.net/smart-tourism?retryWrites=true&w=majority
   ```

### 3. Deploy on Render

#### A) Backend (Web Service)
1. In Render dashboard → **New** → **Web Service**.
2. Connect your GitHub repo → select `smart-tourism-guide`.
3. Configure:
   - **Runtime:** Node
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add **Environment Variables** (in Render dashboard → service → Environment):
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `JWT_SECRET` | `(Render can generate, or set your own)` |
   | `JWT_EXPIRES_IN` | `7d` |
   | `MONGO_URI` | your Atlas connection string |
   | `AI_PROVIDER` | `mock` (or `openai` if you have a key) |
   | `CLIENT_URL` | `https://smart-tourism-guide.onrender.com` (update after frontend deploy) |
5. Deploy. Copy the backend URL, e.g. `https://smart-tourism-api.onrender.com`.

#### B) Frontend (Static Site)
1. In Render dashboard → **New** → **Static Site**.
2. Connect the same GitHub repo → `smart-tourism-guide`.
3. Configure:
   - **Build Command:** `cd client && npm install && npm run build`
   - **Publish Directory:** `client/dist`
4. Add **Environment Variable**:
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://smart-tourism-api.onrender.com/api` |
5. Deploy.

> ⚠️ If you used `render.yaml`, Render can provision both services automatically, but you still need to set `MONGO_URI` and update `VITE_API_URL`/`CLIENT_URL` to the live URLs after the first deploy.

### 4. Verify
- Open your frontend URL.
- Test: register/login, browse destinations, chat with SmartGuide, create a trip with AI itinerary.

---

## Option B: Firebase Hosting (Frontend) + Render (Backend)

If you prefer Firebase for the frontend:

1. **Backend:** Follow Option A step 3 (Render Web Service) to host the API.
2. **Frontend:**
   ```bash
   cd client
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   # public directory: dist
   # single-page app: Yes
   firebase deploy
   ```
3. In `client/.env`, set:
   ```
   VITE_API_URL=https://smart-tourism-api.onrender.com/api
   ```
   Then rebuild & redeploy: `npm run build && firebase deploy`.

---

## Important Notes

### In-memory vs MongoDB
Without `MONGO_URI`, the app runs in **demo mode** with in-memory data. Users/trips created will reset when the service restarts (Render free tier spins down after ~15 min inactivity). Set `MONGO_URI` to MongoDB Atlas for real persistence.

### OpenAI (optional)
To use a real LLM instead of the built-in mock AI, set:
```
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo
```

### Render free tier
- Web services spin down after inactivity; first request may take ~30s.
- Static sites are hosted on a CDN and don't spin down.

---

## File reference

| File | Purpose |
|------|---------|
| `render.yaml` | Render blueprint (backend + frontend services) |
| `server/.env.example` | Backend env vars (copy to `.env`) |
| `client/.env.example` | Frontend `VITE_API_URL` |
| `client/src/services/api.js` | Reads `VITE_API_URL`; falls back to `/api` in dev |
