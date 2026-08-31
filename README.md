# Delta News — Multilingual News & Sports Media SaaS

**Delta News / دلتا نيوز** — production-oriented News & Media platform built with the **MERN stack**.

**Languages:** Arabic (RTL) · English (LTR)  
**Stack:** React 19 · TypeScript · Tailwind CSS · Node.js · Express · MongoDB

**Repository:** https://github.com/mahmoudSElsebaey/aether-news-mern

---

## Brand

| | |
|--|--|
| English | **Delta News** |
| Arabic | **دلتا نيوز** |
| Primary | `#0B1220` |
| Accent | `#E11D48` |

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
npm install
npm run seed
npm run dev
```

### Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

| Role   | Email               | Password   |
|--------|---------------------|------------|
| Admin  | admin@delta.news    | Admin123!  |
| Editor | editor@delta.news   | Editor123! |

---

## Phases 0–7

All core phases completed: discovery, brand, public site, backend, multilingual SEO, admin, API integration, polish.

---

## License

MIT
