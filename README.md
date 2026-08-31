# Aether News — Multilingual News & Sports Media SaaS

Production-oriented News & Media platform built with the **MERN stack**.

**Languages:** Arabic (RTL) · English (LTR)  
**Stack:** React 19 · TypeScript · Tailwind CSS · Node.js · Express · MongoDB

**Repository:** https://github.com/mahmoudSElsebaey/aether-news-mern

---

## Features

- Editorial public site (hero, breaking ticker, trending, categories)
- Full Arabic / English UI + content with `/en` and `/ar` URLs
- SEO: canonical, hreflang, Open Graph, JSON-LD, sitemap, robots
- Admin dashboard (articles, categories, analytics, roles)
- Multilingual article editor
- JWT auth (httpOnly cookies) + role-based access
- Bookmarks API
- Rate limiting, Helmet, centralized validation (Zod)

---

## Quick start

### Backend

```bash
cd server
cp .env.example .env
# MONGODB_URI=...  JWT_SECRET=...  CLIENT_URL=http://localhost:5173
npm install
npm run seed
npm run dev
```

- Health: http://localhost:5000/api/health
- Sitemap: http://localhost:5000/api/sitemap.xml

### Frontend

```bash
cd client
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```

- Site: http://localhost:5173
- Admin: http://localhost:5173/admin/login

| Role   | Email               | Password   |
|--------|---------------------|------------|
| Admin  | admin@aether.news   | Admin123!  |
| Editor | editor@aether.news  | Editor123! |

---

## Project structure

```
aether-news-mern/
├── client/   # Vite + React + TypeScript + Tailwind
└── server/   # Express + Mongoose
```

---

## Phases

| Phase | Status |
|-------|--------|
| 0 — Discovery & Architecture | ✅ |
| 1 — Brand & Design System | ✅ |
| 2 — Public Website | ✅ |
| 3 — Backend | ✅ |
| 4 — Multilingual Content | ✅ |
| 5 — Admin Dashboard | ✅ |
| 6 — Integration | ✅ |
| 7 — Polish & Quality | ✅ |

---

## License

MIT
