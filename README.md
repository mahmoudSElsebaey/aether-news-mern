# Aether News — Multilingual News & Sports Media SaaS

Modern production-ready News & Media platform built with the **MERN stack**.

**Languages:** Arabic (RTL) · English (LTR)  
**Stack:** React 19 · TypeScript · Tailwind CSS · Node.js · Express · MongoDB

**Repo:** https://github.com/mahmoudSElsebaey/aether-news-mern

---

## Brand

- **Name:** Aether News / أثير نيوز
- **Primary:** Deep Ink `#0B1220`
- **Accent:** Signal Red `#E11D48`

---

## Project Structure

```
aether-news-mern/
├── client/          # React + TypeScript + Vite + Tailwind
└── server/          # Express + MongoDB + Mongoose
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Backend

```bash
cd server
cp .env.example .env
# Edit MONGODB_URI and JWT_SECRET
npm install
npm run seed
npm run dev
```

API: http://localhost:5000/api/health

**Seed accounts**
| Role   | Email               | Password   |
|--------|---------------------|------------|
| Admin  | admin@aether.news   | Admin123!  |
| Editor | editor@aether.news  | Editor123! |

### 2. Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

App: http://localhost:5173

---

## API Overview

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/articles?language=ar&category=sports&page=1&sort=latest
GET    /api/articles/:slug
POST   /api/articles          (editor|admin)
PATCH  /api/articles/:id      (editor|admin)
DELETE /api/articles/:id      (editor|admin)

GET    /api/categories
GET    /api/categories/:slug
POST   /api/categories        (admin)

GET    /api/bookmarks         (auth)
POST   /api/bookmarks         (auth)
DELETE /api/bookmarks/:articleId

GET    /api/users             (admin)
```

---

## Development Phases

| Phase | Status |
|-------|--------|
| 0 — Discovery & Architecture | ✅ |
| 1 — Brand & Design System | ✅ |
| 2 — Public Website | ✅ |
| 3 — Backend | ✅ |
| 4 — Multilingual Content System | Pending |
| 5 — Admin Dashboard | Pending |
| 6 — Integration | Pending |
| 7 — Polish & Quality | Pending |

---

## License

MIT
