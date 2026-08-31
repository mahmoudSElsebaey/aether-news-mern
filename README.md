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

## URL strategy (multilingual SEO)

```
/en                  Home (English, LTR)
/ar                  Home (Arabic, RTL)
/en/sports           Category
/ar/sports
/en/article/slug     Article (language-specific slug)
/ar/article/slug-ar
/en/news?q=...       Listing + search
```

- `hreflang` alternates for `en`, `ar`, and `x-default`
- Canonical per language
- Open Graph + Twitter cards
- JSON-LD `NewsArticle` on article pages
- `robots.txt` allows `/en/` and `/ar/`

---

## Getting Started

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

Open http://localhost:5173 → redirects to `/en` or `/ar`.

**Seed accounts**
| Role   | Email               | Password   |
|--------|---------------------|------------|
| Admin  | admin@aether.news   | Admin123!  |
| Editor | editor@aether.news  | Editor123! |

---

## API Overview

```
GET /api/articles?language=ar&category=sports&page=1
GET /api/articles/:slug
POST /api/auth/login
...
```

---

## Development Phases

| Phase | Status |
|-------|--------|
| 0 — Discovery & Architecture | ✅ |
| 1 — Brand & Design System | ✅ |
| 2 — Public Website | ✅ |
| 3 — Backend | ✅ |
| 4 — Multilingual Content System | ✅ |
| 5 — Admin Dashboard | Pending |
| 6 — Integration | Pending |
| 7 — Polish & Quality | Pending |

---

## License

MIT
